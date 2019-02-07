<?php

namespace App\Repository;

use App\Entity\UserToken;
use Doctrine\ORM\EntityManagerInterface;

class UserTokenRepository
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    /**
     * @param UserToken $token
     */
    public function add(UserToken $token) {
        $this->entityManager->persist($token);
        $this->entityManager->flush();
    }

    public function save() {
        $this->entityManager->flush();
    }

    /**
     * @param UserToken $token
     */
    public function remove(UserToken $token) {
        $this->entityManager->remove($token);
        $this->entityManager->flush();
    }

    /**
     * @param string $pk
     *
     * @return UserToken|null
     */
    public function findByPK(string $pk): ?UserToken {
        return $this->entityManager->getRepository(UserToken::class)->find($pk);
    }
}
