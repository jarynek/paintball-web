<?php


namespace App\services;


use Symfony\Component\HttpFoundation\RequestStack;

class FilesService
{
    private const GALLERY_DIR = '../public/sources/gallery';
    protected $requestStack;
    private $galleryNav = [
        'items' => []
    ];
    private $gallery = [
        'dir' => null,
        'title' => null,
        'content' => null,
        'files' => [],
    ];
    private $main;

    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    /**
     * getUrl
     */
    public function getUrl()
    {
        return preg_split('/\//', $this->requestStack->getCurrentRequest()->getUri(), -1, PREG_SPLIT_NO_EMPTY);
    }

    /**
     * @param null $arg
     * @return mixed
     */
    public function getMain($arg = null)
    {
        if(!$arg) {
            throw new \Error('not arg getMain');
        }
        return glob(str_replace('../public','.',self::GALLERY_DIR .'/'. $arg). '/*.jpg', GLOB_BRACE)[0];
    }


    public function getTitle()
    {
        return 'title';

    }

    /**
     * @return mixed
     */
    private function getSlug(): string
    {
        $url = $this->getUrl();
        return end($url);
    }

    /**
     * @return array
     * @throws \Exception
     */
    public function gallery(): array
    {
        if(!file_exists(self::GALLERY_DIR)) {
            throw new \Exception('not gallery dir');
        }

        foreach (scandir(self::GALLERY_DIR) as $dir) {
            if(basename($dir) !== '.' && basename($dir) !== '..' && basename($dir) !== '.DS_Store'){
                $item = [
                    'title' => basename($dir),
                    'slug' => basename($dir),
                    'file' => $this->getMain($dir),
                ];
                array_push($this->galleryNav['items'], $item);
            }
        }

        return $this->galleryNav;
    }

    /**
     * @return array
     * @throws \Exception
     */
    public function galleryBySlug(): array
    {
        if(!file_exists(self::GALLERY_DIR)) {
            throw new \Exception('not gallery dir');
        }

        $dir = glob(self::GALLERY_DIR .'/'. $this->getSlug());
        if(file_exists($dir[0])) {
            $this->gallery['dir'] = $dir[0];
            $this->gallery['title'] =  basename($dir[0]);
        }


        if(file_exists($this->gallery['dir'])) {
            $content = null;
            if(file_exists($this->gallery['dir'] .'/content.html')) {
                $content = str_replace('../public','.',$this->gallery['dir']). '/content.html';
            }

            $this->gallery['content'] = file_get_contents($content);
            foreach (glob($this->gallery['dir'] . '/*.jpg') as $file) {
                array_push($this->gallery['files'], str_replace('../public','',$file));
            }
        }

        return $this->gallery;
    }
}
