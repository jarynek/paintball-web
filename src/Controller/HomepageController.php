<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\services\MailService;

class HomepageController extends AbstractController
{

    public $sections;
    /**
     * @Route("/", name="homepage")
     * @param MailService $mailService
     * @return Response
     */
    public function index(MailService $mailService)
    {
        $this->sections = [
            [
                'id' => 'section_services',
                'title' => 'Služby',
                'tpl'=> 'services'
            ],
            [
                'id' => 'section_contact',
                'title' => 'Kontakt',
                'tpl'=> 'contact'
            ],
            [
                'id' => 'section_order',
                'title' => 'Objednávka',
                'tpl'=> 'order'
            ]
        ];

        return $this->render('homepage/index.html.twig', [
            'controller_name' => 'HomepageController',
            'sections' => $this->sections
        ]);
    }
}
