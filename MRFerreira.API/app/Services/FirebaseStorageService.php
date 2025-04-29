<?php

namespace App\Services;

use Kreait\Firebase\Factory;

class FirebaseStorageService
{
    protected $storage;

    public function __construct()
    {
        $this->storage = (new Factory)
            ->withServiceAccount(storage_path('app/firebase-credentials.json'))
            ->createStorage();
    }

    public function uploadFile($file, $fileName)
    {
        $bucket = $this->storage->getBucket();

        $bucket->upload(
            file_get_contents($file),
            [
                'name' => $fileName
            ]
        );

        return $bucket->object($fileName)->signedUrl(new \DateTime('tomorrow'));
    }

    public function deleteFile($fileName)
    {
        $bucket = $this->storage->getBucket();

        $object = $bucket->object($fileName);
        if ($object->exists()) {
            $object->delete();
        }
    }

    public function getFileUrl($fileName)
    {
        $bucket = $this->storage->getBucket();
        $object = $bucket->object($fileName);
        return $object->signedUrl(new \DateTime('tomorrow'));
    }
}
