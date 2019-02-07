<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\{
    Security, Template
};
use Symfony\Component\Routing\Annotation\Route;

class DefaultController
{
    /**
     * @Route("/{reactRouting}", methods={"GET"}, name="index", requirements={"reactRouting"="^(?!api).+"},
     *     defaults={"reactRouting": null})
     * @Security("is_granted('IS_AUTHENTICATED_ANONYMOUSLY')")
     * @Template("default/index.html.twig")
     */
    public function index() {
        return [];
    }
}