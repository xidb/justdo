<?php

namespace App\Entity;

use DateTime;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Serializable;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity()
 * @ORM\Table(name="`user`")
 * @ORM\EntityListeners({"App\Listener\Entity\UserListener"})
 */
class User implements UserInterface, Serializable
{
    const ROLE_USER = 1;
    const ROLE_SUPER_ADMIN = 0;

    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE = 1;

    /**
     * @ORM\Column(type="integer", name="id")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int
     */
    private $id;

    /**
     * @ORM\Column(type="string", name="email", length=100, unique=true)
     *
     * @var string
     */
    private $email;

    /**
     * @ORM\Column(type="string", name="password_hash", length=255)
     *
     * @var string
     */
    private $passwordHash;

    /**
     * @ORM\Column(type="integer", name="role")
     *
     * @var int
     */
    private $role = self::ROLE_USER;

    /**
     * @ORM\Column(type="integer", name="status")
     *
     * @var int
     */
    private $status = self::STATUS_INACTIVE;

    /**
     * @ORM\Column(type="datetime", name="created")
     *
     * @var DateTime
     */
    private $created;

    /**
     * @ORM\Column(type="datetime", name="updated", nullable=true)
     *
     * @var DateTime|null
     */
    private $updated;

    /**
     * @ORM\Column(type="datetime", name="last_sign_in", nullable=true)
     *
     * @var DateTime|null
     */
    private $lastSignIn;

    /**
     * @ORM\OneToMany(targetEntity="UserToken", mappedBy="user", cascade={"persist", "remove"})
     *
     * @var ArrayCollection
     */
    private $tokens;

    /**
     * @param string $email
     * @param int    $role
     * @param int    $status
     */
    public function __construct(string $email, int $role = null, int $status = null) {
        $this->email = $email;
        $role === null ?: $this->role = $role;
        $status === null ?: $this->status = $status;
        $this->created = new DateTimeImmutable();
        $this->tokens = new ArrayCollection();
    }

    /**
     * {@inheritdoc}
     */
    public function getUsername(): string {
        return $this->email;
    }

    /**
     * {@inheritdoc}
     */
    public function getPassword(): string {
        return $this->passwordHash;
    }

    /**
     * {@inheritdoc}
     */
    public function getSalt(): string {
        return '';
    }

    /**
     * {@inheritdoc}
     */
    public function getRoles(): array {
        $roles = [];
        switch ($this->role) {
            case self::ROLE_USER:
                $roles[] = 'ROLE_USER';
                break;
            case self::ROLE_SUPER_ADMIN:
                $roles[] = 'ROLE_USER';
                $roles[] = 'ROLE_SUPER_ADMIN';
                break;
        }

        return $roles;
    }

    /**
     * {@inheritdoc}
     */
    public function eraseCredentials() {
    }

    /**
     * {@inheritdoc}
     */
    public function serialize(): string {
        return serialize([$this->id, $this->email, $this->passwordHash]);
    }

    /**
     * {@inheritdoc}
     */
    public function unserialize($data) {
        list($this->id, $this->email, $this->passwordHash) = unserialize($data);
    }

    /**
     * @return int
     */
    public function getID(): int {
        return $this->id;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email) {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getEmail(): string {
        return $this->email;
    }

    /**
     * @param string $passwordHash
     */
    public function setPasswordHash(string $passwordHash) {
        $this->passwordHash = $passwordHash;
    }

    /**
     * @return string
     */
    public function getPasswordHash(): string {
        return $this->passwordHash;
    }

    /**
     * @param int $role
     */
    public function setRole(int $role) {
        $this->role = $role;
    }

    /**
     * @return int
     */
    public function getRole(): int {
        return $this->role;
    }

    /**
     * @param int $status
     */
    public function setStatus(int $status) {
        $this->status = $status;
    }

    /**
     * @return int
     */
    public function getStatus(): int {
        return $this->status;
    }

    /**
     * @param string $format
     *
     * @return DateTime|string
     */
    public function getCreated(string $format = null) {
        if ($this->created !== null && $format !== null) {
            return (clone $this->created)->format($format);
        }

        return $this->created;
    }

    /**
     * @param DateTimeImmutable $updated
     */
    public function setUpdated(DateTimeImmutable $updated) {
        $this->updated = $updated;
    }

    /**
     * @param string $format
     *
     * @return DateTime|string|null
     */
    public function getUpdated(string $format = null) {
        if ($this->updated !== null && $format !== null) {
            return (clone $this->updated)->format($format);
        }

        return $this->updated;
    }

    /**
     * @param DateTimeImmutable $lastSignIn
     */
    public function setLastSignIn(DateTimeImmutable $lastSignIn) {
        $this->lastSignIn = $lastSignIn;
    }

    /**
     * @param string $format
     *
     * @return DateTime|string|null
     */
    public function getLastSignIn(string $format = null) {
        if ($this->lastSignIn !== null && $format !== null) {
            return (clone $this->lastSignIn)->format($format);
        }

        return $this->lastSignIn;
    }

    /**
     * @return ArrayCollection
     */
    public function getTokens(): ArrayCollection {
        return $this->tokens;
    }
}
