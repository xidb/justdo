<?php

namespace App\Form\Type;

use App\DTO\PasswordResetDTO;
use Symfony\Component\Form\{
    AbstractType, FormBuilderInterface
};
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\{
    Length, NotBlank
};

class PasswordResetType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder->add('newPassword', null, [
            'constraints' => [
                new NotBlank(),
                new Length(['min' => 4]),
            ],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults([
            'data_class'      => PasswordResetDTO::class,
            'csrf_protection' => false,
        ]);
    }
}
