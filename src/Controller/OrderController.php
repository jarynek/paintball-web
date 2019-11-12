<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\services\OrderService;

class OrderController extends AbstractController
{

    const STATUS = [
        'send' => 200,
        'control'=>201,
        'error'=>202
    ];

    /**

     * @Route("/order", name="order")
     * @param Request $request
     * @return Response
     */
    public function index(Request $request, OrderService $orderService)
    {
        $formData = $request->request->all();
        $httpStatus = null;
        $formBuilder = [
            ['name' => 'name', 'check' => 'fill', 'value' => null],
            ['name' => 'user_name', 'check' => 'fill', 'value' => null],
            ['name' => 'email', 'check' => 'email', 'value' => null],
        ];


        $mockData = [
            'name' => 'hsfsd',
            'user_name' => 'asdfsdf',
            'email' => 'adfsdf@asdsad.sk',
            'mobil' => 'asdfsf',
            'players_count' =>'sdfsd',
            'date_time_from' => 'asdfs',
            'date_time_to' => 'sdfdsf',
            'beer' => 'sdfs',
            'liters' => 'sxfsdf'
        ];

        foreach ($formBuilder as $key => $item) {
            switch ($item['check']) {
                case 'fill':
                    $formBuilder[$key]['value'] = $orderService->checkFill($formData[$item['name']]);
                    break;
                case 'email':
                    $formBuilder[$key]['value'] = $orderService->checkMail($formData[$item['name']]);
                    break;
                default:
                    break;
            }
        }

        if(isset($formData)){
            if(count(array_keys(array_column($formBuilder, 'value'), '')) > 0) {
                $httpStatus = self::STATUS['error'];
            }else {
                if(isset($formData['send_order'])){
                    $httpStatus = self::STATUS['send'];
                }else {
                    $httpStatus = self::STATUS['control'];
                }
            }
        }

        $response = new Response($this->renderView('components/order.html.twig', array(
            'formData' => $formData
            )), $httpStatus
        );
        $response->headers->set('X-Robots-Tag','noindex');
        return $response;
    }
}
