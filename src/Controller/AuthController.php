<?php

namespace App\Controller;

use RuntimeException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    /**
     * @Route("/api/auth", methods={"POST"}, name="auth")
     * @Security("is_granted('IS_AUTHENTICATED_ANONYMOUSLY')")
     *
     * @throws RuntimeException
     */
    public function create() {
        throw new RuntimeException('Invalid authentication handlers in your security firewall configuration.');
    }
}