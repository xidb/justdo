<?php

namespace App\Form\Util;

use Symfony\Component\Form\FormInterface;

class FormHelper
{
    /**
     * @param FormInterface $form
     *
     * @return array
     */
    public function convertErrors(FormInterface $form): array {
        return $this->convertErrorsAsArray($form);
    }

    /**
     * @param FormInterface $form
     *
     * @return array
     */
    private function convertErrorsAsArray(FormInterface $form): array {
        $errors = [];
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }
        foreach ($form->all() as $key => $child) {
            $error = $this->convertErrorsAsArray($child);
            if (count($error) > 0) {
                $errors[$key] = $error;
            }
        }

        return $errors;
    }
}
