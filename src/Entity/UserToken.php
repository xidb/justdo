<?php

namespace App\Entity;

use DateInterval;
use DateTime;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;

/**
 * @ORM\Entity()
 * @ORM\Table(name="user_token")
 */
class UserToken
{
    const TYPE_ACCOUNT_ACTIVATION = 1;
    const TYPE_PASSWORD_RESET = 2;
    const TYPE_EMAIL_CHANGE = 3;

    const TTL_PASSWORD_RESET_REQUEST = 86400;
    const TTL_EMAIL_CHANGE = 86400;

    /**
     * @ORM\Column(type="uuid", name="uuid", unique=true)
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class="Ramsey\Uuid\Doctrine\UuidGenerator")
     *
     * @var Uuid
     */
    private $uuid;

    /**
     * @ORM\Column(type="integer", name="user_id")
     *
     * @var int
     */
    private $userID;

    /**
     * @ORM\Column(type="integer", name="type")
     *
     * @var int
     */
    private $type;

    /**
     * @ORM\Column(type="string", name="comment", length=255)
     *
     * @var string
     */
    private $comment = '';

    /**
     * @ORM\Column(type="datetime", name="created")
     *
     * @var DateTime
     */
    private $created;

    /**
     * @ORM\Column(type="datetime", name="used", nullable=true)
     *
     * @var DateTime|null
     */
    private $used;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="tokens")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     *
     * @var User
     */
    private $user;

    /**
     * @param User   $user
     * @param int    $type
     * @param string $comment
     */
    public function __construct(User $user, int $type, string $comment = null) {
        $this->user = $user;
        $this->type = $type;
        $comment === null ?: $this->comment = $comment;
        $this->created = new DateTimeImmutable();
    }

    /**
     * @return string
     */
    public function getUUID(): string {
        return (string) $this->uuid;
    }

    /**
     * @param DateTimeImmutable $used
     */
    public function setUsed(DateTimeImmutable $used) {
        $this->used = $used;
    }

    /**
     * @return int
     */
    public function getUserID(): int {
        return $this->userID;
    }

    /**
     * @return int
     */
    public function getType(): int {
        return $this->type;
    }

    /**
     * @return string
     */
    public function getComment(): string {
        return $this->comment;
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
     * @param string $format
     *
     * @return DateTime|string|null
     */
    public function getUsed(string $format = null) {
        if ($this->used !== null && $format !== null) {
            return (clone $this->used)->format($format);
        }

        return $this->used;
    }

    /**
     * @return User
     */
    public function getUser(): User {
        return $this->user;
    }

    /**
     * @return bool
     */
    public function isExpired(): bool {
        if ($this->type === self::TYPE_PASSWORD_RESET) {
            $expiredAt = (clone $this->created)->add(new DateInterval('PT' . self::TTL_PASSWORD_RESET_REQUEST . 'S'));
            if ($expiredAt < new DateTimeImmutable()) {
                return true;
            }
        }
        if ($this->type === self::TYPE_EMAIL_CHANGE) {
            $expiredAt = (clone $this->created)->add(new DateInterval('PT' . self::TTL_EMAIL_CHANGE . 'S'));
            if ($expiredAt < new DateTimeImmutable()) {
                return true;
            }
        }

        return false;
    }
}
