<?php

return [
    'default' => env('CACHE_DRIVER', 'array'),

    'stores' => [
        'array' => [
            'driver' => 'array',
        ],

        'file' => [
            'driver' => 'file',
            'path' => storage_path('framework/cache/data'),
        ],

        // Add redis if needed
        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
        ],
    ],

    'prefix' => env('CACHE_PREFIX', 'lumen_cache'),
];
