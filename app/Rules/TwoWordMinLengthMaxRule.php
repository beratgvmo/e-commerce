<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TwoWordMinLengthMaxRule implements ValidationRule
{
    private $min;
    private $max;

    public function __construct($min, $max)
    {
        $this->min = $min;
        $this->max = $max;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $words = explode(' ', $value);
        if (count($words) < 2) {
            $fail('The :attribute must contain at least two words.');
            return;
        }
        foreach ($words as $word) {
            if (strlen($word) < $this->min || strlen($word) > $this->max) {
                $fail("Each word in :attribute must be between {$this->min} and {$this->max} characters.");
                return;
            }
        }
    }
}
