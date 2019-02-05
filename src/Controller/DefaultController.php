<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController
{
    /**
     * @Template("default/index.html.twig")
     * @Route("/{reactRouting}", name="index", defaults={"reactRouting": null})
     */
    public function index() {
        return [];
    }
}