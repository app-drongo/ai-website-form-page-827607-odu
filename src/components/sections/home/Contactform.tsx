'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Shield, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const DEFAULT_CONTACT_FORM = {
  heading: 'Get In Touch',
  subheading:
    "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  nameLabel: 'Full Name',
  emailLabel: 'Email Address',
  phoneLabel: 'Phone Number',
  subjectLabel: 'Subject',
  messageLabel: 'Message',
  inquiryTypeLabel: 'Inquiry Type',
  inquiryOptions: ['General Inquiry', 'Support', 'Sales'],
  submitText: 'Send Message',
  privacyNote: 'Your information is secure and will never be shared with third parties.',
  requiredFieldsNote: 'Fields marked with * are required',
  consentText: 'I agree to the privacy policy and terms of service',
} as const;

type ContactFormProps = Partial<typeof DEFAULT_CONTACT_FORM>;

export default function Contactform(props: ContactFormProps) {
  const config = { ...DEFAULT_CONTACT_FORM, ...props };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    if (!formData.consent) newErrors.consent = 'You must agree to continue';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form on success
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: '',
      consent: false,
    });
    setIsSubmitting(false);
    setErrors({});
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <section id="contact-form" className="bg-background text-foreground py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="bg-card text-card-foreground shadow-lg">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl font-bold">
              <span data-editable="heading">{config.heading}</span>
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              <span data-editable="subheading">{config.subheading}</span>
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              data-form-id="694a732b44e7bda6c066556f"
            >
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  <span data-editable="nameLabel">{config.nameLabel}</span>
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  className={`bg-background border-border ${errors.name ? 'border-destructive' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  <span data-editable="emailLabel">{config.emailLabel}</span>
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className={`bg-background border-border ${errors.email ? 'border-destructive' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  <span data-editable="phoneLabel">{config.phoneLabel}</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  className="bg-background border-border"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Inquiry Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  <span data-editable="inquiryTypeLabel">{config.inquiryTypeLabel}</span>
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Select
                  value={formData.inquiryType}
                  onValueChange={value => handleInputChange('inquiryType', value)}
                >
                  <SelectTrigger
                    className={`bg-background border-border ${errors.inquiryType ? 'border-destructive' : ''}`}
                  >
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground">
                    {config.inquiryOptions.map((option, idx) => (
                      <SelectItem key={idx} value={option}>
                        <span data-editable={`inquiryOptions[${idx}]`}>{option}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.inquiryType && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.inquiryType}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">
                  <span data-editable="subjectLabel">{config.subjectLabel}</span>
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={e => handleInputChange('subject', e.target.value)}
                  className={`bg-background border-border ${errors.subject ? 'border-destructive' : ''}`}
                  placeholder="Enter message subject"
                />
                {errors.subject && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  <span data-editable="messageLabel">{config.messageLabel}</span>
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={e => handleInputChange('message', e.target.value)}
                  className={`bg-background border-border min-h-[120px] ${errors.message ? 'border-destructive' : ''}`}
                  placeholder="Enter your message here..."
                />
                {errors.message && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={checked => handleInputChange('consent', checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                    <span data-editable="consentText">{config.consentText}</span>
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                </div>
                {errors.consent && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span data-editable="submitText">{config.submitText}</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Privacy Notes */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 mt-0.5 text-primary" />
                <span data-editable="privacyNote">{config.privacyNote}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                <span data-editable="requiredFieldsNote">{config.requiredFieldsNote}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
