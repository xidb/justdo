<?php

namespace App\Security\Guard;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Guard\JWTTokenAuthenticator as BaseAuthenticator;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTAuthenticator extends BaseAuthenticator
{
    /**
     * {@inheritdoc}
     *
     * @throws AuthenticationException
     */
    public function checkCredentials($credentials, UserInterface $user): bool {
        /** @var User $user */
        $payload = $credentials->getPayload();
        if ($payload['role'] !== $user->getRole()) {
            throw new AuthenticationException();
        }

        if ($user->getStatus() === User::STATUS_INACTIVE) {
            throw new AuthenticationException();
        }

        return true;
    }
}
