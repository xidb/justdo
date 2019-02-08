<?php

namespace App\Security\HTTP;

use App\Entity\User;
use App\Repository\UserRepository;
use DateTimeImmutable;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\{
    JsonResponse, Request
};
use Symfony\Component\Security\Core\Authentication\Token\{
    PreAuthenticatedToken, TokenInterface
};
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\{
    AuthenticationException, BadCredentialsException, UsernameNotFoundException
};
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Authentication\{
    AuthenticationFailureHandlerInterface, AuthenticationSuccessHandlerInterface, SimplePreAuthenticatorInterface
};

class JSONAuthenticator implements SimplePreAuthenticatorInterface, AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    /**
     * @var JWTTokenManagerInterface
     */
    private $tokenManager;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @param UserPasswordEncoderInterface $encoder
     * @param JWTTokenManagerInterface     $tokenManager
     * @param UserRepository               $userRepository
     */
    public function __construct(
        UserPasswordEncoderInterface $encoder,
        JWTTokenManagerInterface $tokenManager,
        UserRepository $userRepository
    ) {
        $this->encoder = $encoder;
        $this->tokenManager = $tokenManager;
        $this->userRepository = $userRepository;
    }

    /**
     * {@inheritdoc}
     *
     * @throws BadCredentialsException
     */
    public function createToken(Request $request, $providerKey): PreAuthenticatedToken {
        $credentials = (array) json_decode($request->getContent(), true);
        if (!isset($credentials['email'], $credentials['password'])) {
            throw new BadCredentialsException();
        }

        return new PreAuthenticatedToken($credentials['email'], $credentials, $providerKey);
    }

    /**
     * {@inheritdoc}
     */
    public function supportsToken(TokenInterface $token, $providerKey): bool {
        return $token instanceof PreAuthenticatedToken && $token->getProviderKey() === $providerKey;
    }

    /**
     * {@inheritdoc}
     *
     * @throws AuthenticationException
     */
    public function authenticateToken(TokenInterface $token, UserProviderInterface $userProvider, $providerKey): PreAuthenticatedToken {
        $credentials = $token->getCredentials();
        try {
            $user = $userProvider->loadUserByUsername($credentials['email']);
        } catch (UsernameNotFoundException $exception) {
            throw new AuthenticationException('Invalid email or password.');
        }

        if (!$this->encoder->isPasswordValid($user, $credentials['password'])) {
            throw new AuthenticationException('Invalid email or password.');
        }

        /** @var User $user */
        if ($user->getStatus() === User::STATUS_INACTIVE) {
            throw new AuthenticationException('User is inactive. Please check your e-mail to confirm sign up.');
        }

        return new PreAuthenticatedToken($user, $credentials, $providerKey, $user->getRoles());
    }

    /**
     * {@inheritdoc}
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse {
        /** @var User $user */
        $user = $token->getUser();
        $user->setLastSignIn(new DateTimeImmutable());
        $this->userRepository->save();

        $response = ['attributes' => ['accessToken' => $this->tokenManager->create($user)]];

        return new JsonResponse($response, JsonResponse::HTTP_CREATED);
    }

    /**
     * {@inheritdoc}
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): JsonResponse {
        $response = ['message' => $exception->getMessage()];

        return new JsonResponse($response, JsonResponse::HTTP_UNAUTHORIZED, ['WWW-Authenticate' => 'Bearer']);
    }
}
