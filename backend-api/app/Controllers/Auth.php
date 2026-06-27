<?php

namespace App\Controllers;

use App\Models\UserModel;

class Auth extends BaseController
{
    public function login()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        
        $userModel = new UserModel();

        $data = $this->request->getJSON(true);

        $user = $userModel
            ->where('username', $data['username'])
            ->first();

        if (!$user) {
            return $this->response->setJSON([
                'status' => false,
                'message' => 'User tidak ditemukan'
            ]);
        }

        if (password_verify($data['password'], $user['password'])) {

            $token = bin2hex(random_bytes(32));

            $userModel->update(
                $user['id'],
                ['token' => $token]
            );

            return $this->response->setJSON([
                'status' => true,
                'token' => $token
            ]);
        }

        return $this->response->setJSON([
            'status' => false,
            'message' => 'Password salah'
        ]);
    }
}