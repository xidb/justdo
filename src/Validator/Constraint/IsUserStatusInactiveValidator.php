<?php

namespace App\Validator\Constraint;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Validator\{
    Constraint, ConstraintValidator
};

class IsUserStatusInactiveValidator extends ConstraintValidator
{
    /**
     * @var UserRepository
     */
    private $repository;

    /**
     * @param UserRepository $repository
     */
    public function __construct(UserRepository $repository) {
        $this->repository = $repository;
    }

    /**
     * {@inheritdoc}
     */
    public function validate($value, Constraint $constraint) {
        if ($value === null || $value === '' || !preg_match('/^.+@\S+\.\S+$/', $value)) {
            return;
        }

        $user = $this->repository->findOneByEmail($value);
        if ($user === null) {
            $this->context->buildViolation('User not found.')->addViolation();

            return;
        }

        if ($user->getStatus() === User::STATUS_ACTIVE) {
            $this->context->buildViolation('Account is active.')->addViolation();
        }
    }
}
