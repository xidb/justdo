<?php

namespace App\Validator\Constraint;

use App\Repository\UserRepository;
use Symfony\Component\Validator\{
    Constraint, ConstraintValidator
};

class UniqueUserEmailValidator extends ConstraintValidator
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

        if (in_array($value, $constraint->getExcludedValues())) {
            return;
        }

        $user = $this->repository->findOneByEmail($value);
        if ($user !== null) {
            $this->context->buildViolation('This email address is already taken.')->addViolation();
        }
    }
}
