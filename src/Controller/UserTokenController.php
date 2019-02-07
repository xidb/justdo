<?php

namespace App\Controller;

use App\DTO\{
    PasswordResetDTO, PasswordResetRequestDTO
};
use App\Entity\{
    User, UserToken
};
use App\Form\Type\{
    PasswordResetRequestType, PasswordResetType
};
use App\Form\Util\FormHelper;
use App\Mailer\UserMailer;
use App\Repository\{
    UserRepository, UserTokenRepository
};
use DateTimeImmutable;
use Ramsey\Uuid\Uuid;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\{
    JsonResponse, Request
};
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserTokenController
{
    /**
     * @var AuthorizationCheckerInterface
     */
    private $authorizationChecker;

    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

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
     * @param TokenStorageInterface         $tokenStorage
     * @param UserPasswordEncoderInterface  $encoder
     * @param FormFactoryInterface          $formFactory
     * @param UserRepository                $userRepository
     * @param UserTokenRepository           $tokenRepository
     * @param UserMailer                    $mailer
     */
    public function __construct(
        AuthorizationCheckerInterface $authorizationChecker,
        TokenStorageInterface $tokenStorage,
        UserPasswordEncoderInterface $encoder,
        FormFactoryInterface $formFactory,
        UserRepository $userRepository,
        UserTokenRepository $tokenRepository,
        UserMailer $mailer
    ) {
        $this->authorizationChecker = $authorizationChecker;
        $this->tokenStorage = $tokenStorage;
        $this->encoder = $encoder;
        $this->formFactory = $formFactory;
        $this->userRepository = $userRepository;
        $this->tokenRepository = $tokenRepository;
        $this->mailer = $mailer;
    }

    /**
     * @Route("/api/user-token", methods={"POST"}, name="user_token_create")
     * @Security("is_granted('IS_AUTHENTICATED_ANONYMOUSLY')")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse {
        $body = (array) json_decode($request->getContent(), true);

        if (isset($body['passwordReset'])) {
            $dto = new PasswordResetRequestDTO();
            $form = $this->formFactory->create(PasswordResetRequestType::class, $dto);
            $form->submit($body['passwordReset']);
            if (!$form->isValid()) {
                $response = [
                    'message' => 'Data validation failed.',
                    'errors'  => (new FormHelper())->convertErrors($form),
                ];

                return new JsonResponse($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user = $this->userRepository->findOneByEmail($dto->getEmail());
            $token = new UserToken($user, UserToken::TYPE_PASSWORD_RESET);
            $this->tokenRepository->add($token);
            $this->mailer->sendPasswordResetMessage($user, $token, $dto->getAppURL());

            return new JsonResponse();
        }

        return new JsonResponse(['message' => 'Missing or invalid body parameters.'], JsonResponse::HTTP_BAD_REQUEST);
    }

    /**
     * @Route("/api/user-token/{token}", methods={"GET"}, name="user_token_get")
     * @Security("is_granted('IS_AUTHENTICATED_ANONYMOUSLY')")
     *
     * @param string $token
     *
     * @return JsonResponse
     */
    public function get(string $token): JsonResponse {
        if (!Uuid::isValid($token) || ($token = $this->tokenRepository->findByPK($token)) === null) {
            return new JsonResponse(['message' => 'Token not found.'], JsonResponse::HTTP_NOT_FOUND);
        }

        return new JsonResponse([
            'attributes' => [
                'uuid'      => $token->getUUID(),
                'user_id'   => $token->getUserID(),
                'type'      => $token->getType(),
                'comment'   => $token->getComment(),
                'createdAt' => $token->getCreated(DATE_ATOM),
                'usedAt'    => $token->getUsed(DATE_ATOM),
                'isExpired' => $token->isExpired(),
            ],
        ]);
    }

    /**
     * @Route("/api/user-token/{token}/activate", methods={"GET"}, name="user_token_account_activation")
     * @Security("is_granted('IS_AUTHENTICATED_ANONYMOUSLY')")
     *
     * @param string $token
     *
     * @return JsonResponse
     */
    public function updateAccountActivation(string $token): JsonResponse {
        if (!Uuid::isValid($token) || ($token = $this->tokenRepository->findByPK($token)) === null) {
            return new JsonResponse(['message' => 'Token not found.'], JsonResponse::HTTP_NOT_FOUND);
        }
        if ($token->getUsed() !== null) {
            return new JsonResponse(['message' => 'Token is already used.'], JsonResponse::HTTP_GONE);
        }

        $user = $token->getUser();
        $user->setStatus(User::STATUS_ACTIVE);
        $this->userRepository->save();
        $token->setUsed(new DateTimeImmutable());
        $this->tokenRepository->save();

        return new JsonResponse();
    }

    /**
     * @Route("/api/user-token/{token}/password-reset", methods={"PATCH"}, name="user_token_password_reset")
     * @Security("is_granted('IS_AUTHENTICATED_ANONYMOUSLY')")
     *
     * @param Request $request
     * @param string  $token
     *
     * @return JsonResponse
     */
    public function updatePasswordReset(Request $request, string $token): JsonResponse {
        if (!Uuid::isValid($token) || ($token = $this->tokenRepository->findByPK($token)) === null) {
            return new JsonResponse(['message' => 'Token not found.'], JsonResponse::HTTP_NOT_FOUND);
        }
        if ($token->getUsed() !== null) {
            return new JsonResponse(['message' => 'Token is already used.'], JsonResponse::HTTP_GONE);
        }
        if ($token->isExpired()) {
            return new JsonResponse(['message' => 'Token is expired.'], JsonResponse::HTTP_GONE);
        }

        $body = (array) json_decode($request->getContent(), true);
        $dto = new PasswordResetDTO();
        $form = $this->formFactory->create(PasswordResetType::class, $dto);
        $form->submit($body);
        if (!$form->isValid()) {
            $response = [
                'message' => 'Data validation failed.',
                'errors'  => (new FormHelper())->convertErrors($form),
            ];

            return new JsonResponse($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = $token->getUser();
        $user->setPasswordHash($this->encoder->encodePassword($user, $dto->getNewPassword()));
        $this->userRepository->save();
        $token->setUsed(new DateTimeImmutable());
        $this->tokenRepository->save();

        return new JsonResponse();
    }
}
