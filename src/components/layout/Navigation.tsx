'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'Brand',
  brandHref: '/',
  menuItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Contact Form', href: '#contact-form' },
  ],
  ctaText: 'Get Started',
  ctaHref: '/get-started',
  showCta: true,
  showMobileMenu: true,
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBrandClick = () => {
    navigate(config.brandHref);
  };

  const handleMenuItemClick = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="navigation"
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="text-lg font-semibold text-foreground hover:text-primary"
              onClick={handleBrandClick}
              data-editable-href="brandHref"
              data-href={config.brandHref}
            >
              <span data-editable="brandName">{config.brandName}</span>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {config.menuItems.map((item, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                  onClick={() => handleMenuItemClick(item.href)}
                  data-editable-href={`menuItems[${idx}].href`}
                  data-href={item.href}
                >
                  <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          {config.showCta && (
            <div className="hidden md:block">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleCtaClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
              >
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {config.showMobileMenu && (
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:text-primary hover:bg-accent"
                    aria-label="Open menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] bg-background text-foreground border-border"
                >
                  <div className="flex flex-col space-y-4 mt-8">
                    {/* Mobile Brand */}
                    <Button
                      variant="ghost"
                      className="justify-start text-lg font-semibold text-foreground hover:text-primary hover:bg-accent"
                      onClick={handleBrandClick}
                      data-editable-href="brandHref"
                      data-href={config.brandHref}
                    >
                      <span data-editable="brandName">{config.brandName}</span>
                    </Button>

                    <div className="border-t border-border pt-4">
                      {/* Mobile Menu Items */}
                      {config.menuItems.map((item, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          className="w-full justify-start text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                          onClick={() => handleMenuItemClick(item.href)}
                          data-editable-href={`menuItems[${idx}].href`}
                          data-href={item.href}
                        >
                          <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
                        </Button>
                      ))}

                      {/* Mobile CTA */}
                      {config.showCta && (
                        <div className="pt-4 border-t border-border mt-4">
                          <Button
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={handleCtaClick}
                            data-editable-href="ctaHref"
                            data-href={config.ctaHref}
                          >
                            <span data-editable="ctaText">{config.ctaText}</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
