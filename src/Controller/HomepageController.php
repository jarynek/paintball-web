<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\services\MailService;
use App\services\FilesService;

class HomepageController extends AbstractController
{

    public $sections;

    /**
     * @Route("/", name="homepage")
     * @param MailService $mailService
     * @param FilesService $filesService
     * @return Response
     */
    public function index(MailService $mailService, FilesService $filesService)
    {
        $this->sections = [
            [
                'id' => 'section_about',
                'title' => 'O nás',
                'legend' => 'Kdo jsme, kde top je',
                'tpl'=> 'about',
                'href' => null,
            ],
            [
                'id' => 'section_services',
                'title' => 'Paintball',
                'legend' => 'Služby, plac, výstroj',
                'tpl'=> 'services',
                'href' => null,
            ],
            [
                'id' => 'section_order',
                'title' => 'Objednat hru',
                'legend' => 'Formulář, e-mail nebo zavolat',
                'tpl'=> 'order',
                'href' => null,
            ]
        ];

        return $this->render('homepage/index.html.twig', [
            'controller_name' => 'HomepageController',
            'sections' => $this->sections
        ]);
    }


    /**
     * @Route("/gallery", name="gallery")
     * @param FilesService $filesService
     * @return Response
     * @throws \Exception
     */
    public function gallery(FilesService $filesService)  {
        try{
            return $this->render('gallery/index.html.twig', [
                'title' => 'Gallery',
                'gallery' => $filesService->gallery()
            ]);
        } catch (\Exception $exception) {
            var_dump($exception->getMessage());
        }
    }

    /**
     * @Route("/gallery/{slug}", name="gallery_detail")
     * @param FilesService $filesService
     * @return Response
     * @throws \Exception
     */
    public function galleryDetail(FilesService $filesService)  {
        try{
            return $this->render('gallery/detail.html.twig', [
                'title' => 'gallery_detail',
                'gallery' => $filesService->galleryBySlug()
            ]);
        } catch (\Exception $exception) {
            var_dump($exception->getMessage());
        }
    }
}
