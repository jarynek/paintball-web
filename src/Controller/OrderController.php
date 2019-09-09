<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class OrderController extends AbstractController
{

    /**

     * @Route("/order", name="order")
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $formData = $request->request->all();

        /**
         * check data
         */

        /**
         * send data
         */

        return $this->render('components/order.html.twig', [
            'formData' => $formData
        ]);
    }
}
