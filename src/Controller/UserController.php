<?php

namespace App\Controller;

use App\DTO\{
    RegistrationDTO, UserDTO
};
use App\Entity\{
    User, UserToken
};
use App\Form\Type\{
    RegistrationType, UserCreationType
};
use App\Form\Util\FormHelper;
use App\Mailer\UserMailer;
use App\Repository\{
    UserRepository, UserTokenRepository
};
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\{
    JsonResponse, Request
};
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController
{
    /**
     * @var AuthorizationCheckerInterface
     */
    private $authorizationChecker;

    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * @var FormFactoryInterface
     */
    private $formFactory;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var UserTokenRepository
     */
    private $tokenRepository;

    /**
     * @var UserMailer
     */
    private $mailer;

    /**
     * @param AuthorizationCheckerInterface $authorizationChecker
     * @param UserPasswordEncoderInterface  $encoder
     * @param RouterInterface               $router
     * @param FormFactoryInterface          $formFactory
     * @param UserRepository                $userRepository
     * @param UserTokenRepository           $tokenRepository
     * @param UserMailer                    $mailer
     */
    public function __construct(
        AuthorizationCheckerInterface $authorizationChecker,
        UserPasswordEncoderInterface $encoder,
        RouterInterface $router,
        FormFactoryInterface $formFactory,
        UserRepository $userRepository,
        UserTokenRepository $tokenRepository,
        UserMailer $mailer
    ) {
        $this->authorizationChecker = $authorizationChecker;
        $this->encoder = $encoder;
        $this->router = $router;
        $this->formFactory = $formFactory;
        $this->userRepository = $userRepository;
        $this->tokenRepository = $tokenRepository;
        $this->mailer = $mailer;
    }

    /**
     * @Route("/api/user", methods={"POST"}, name="user_create")
     * @Security("is_granted('IS_AUTHENTICATED_ANONYMOUSLY')")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse {
        $body = (array) json_decode($request->getContent(), true);
        if ($this->authorizationChecker->isGranted('ROLE_SUPER_ADMIN')) {
            $dto = new UserDTO();
            $form = $this->formFactory->create(UserCreationType::class, $dto);
            $form->submit($body);
            if (!$form->isValid()) {
                $response = ['message' => 'Data validation failed.', 'errors' => (new FormHelper())->convertErrors($form)];

                return new JsonResponse($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user = new User($dto->getEmail(), $dto->getRole(), $dto->getStatus());
            $user->setPasswordHash($this->encoder->encodePassword($user, $dto->getPassword()));
            $this->userRepository->add($user);
        } else {
            $dto = new RegistrationDTO();
            $form = $this->formFactory->create(RegistrationType::class, $dto);
            $form->submit($body);
            if (!$form->isValid()) {
                $response = ['message' => 'Data validation failed.', 'errors' => (new FormHelper())->convertErrors($form)];

                return new JsonResponse($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user = new User($dto->getEmail());
            $user->setPasswordHash($this->encoder->encodePassword($user, $dto->getPassword()));
            $this->userRepository->add($user);
            $token = new UserToken($user, UserToken::TYPE_ACCOUNT_ACTIVATION);
            $this->tokenRepository->add($token);
            $this->mailer->sendAccountActivationMessage($user, $token, $dto->getAppURL());
        }

        $response = [
            'id'          => $user->getID(),
            'email'       => $user->getEmail(),
            'role'        => $user->getRole(),
            'status'      => $user->getStatus(),
            'createdAt'   => $user->getCreated(DATE_ATOM),
            'updatedAt'   => $user->getUpdated(DATE_ATOM),
            'lastLoginAt' => $user->getLastSignIn(DATE_ATOM),
        ];
        $headers = [
            'Location' => $this->router->generate('user_get', ['id' => $user->getId()], RouterInterface::ABSOLUTE_URL),
        ];

        return new JsonResponse($response, JsonResponse::HTTP_CREATED, $headers);
    }

    /**
     * @Route("api/user/{id}", methods={"GET"}, name="user_get")
     * @Security("is_granted('IS_AUTHENTICATED_ANONYMOUSLY')")
     *
     * @param string $id
     *
     * @return JsonResponse
     */
    public function read(string $id): JsonResponse
    {
        $user = $this->userRepository->findByPK((int) $id);
        if ($user === null) {
            return new JsonResponse(['message' => 'User not found.'], JsonResponse::HTTP_NOT_FOUND);
        }

        return new JsonResponse([
            'attributes' => [
                'id' => $user->getID(),
                'email' => $user->getEmail(),
                'role' => $user->getRole(),
                'status' => $user->getStatus(),
                'createdAt' => $user->getCreated(DATE_ATOM),
                'updatedAt' => $user->getUpdated(DATE_ATOM),
                'lastLoginAt' => $user->getLastSignIn(DATE_ATOM),
            ],
        ]);
    }
}
