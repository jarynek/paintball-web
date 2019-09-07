<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class OrderController extends AbstractController
{

    /**
     * @Route("/order", name="order")
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        var_dump($request->request->all());

        /**
         * check data
         */

        /**
         * send data
         */

        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/OrderController.php',
        ]);
    }
}
