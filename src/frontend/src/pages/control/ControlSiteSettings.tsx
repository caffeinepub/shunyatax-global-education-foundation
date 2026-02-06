import { useState } from 'react';
import { useGetSiteSettings, useUpdateSiteSettings } from '@/hooks/useSiteSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, Plus, Trash2, Settings } from 'lucide-react';
import { toast } from 'sonner';
import type { SiteSettings, SiteSettingsLink } from '@/backend';

export default function ControlSiteSettings() {
  const { data: settings, isLoading } = useGetSiteSettings();
  const updateSettings = useUpdateSiteSettings();

  const [headerLinks, setHeaderLinks] = useState<SiteSettingsLink[]>([]);
  const [footerLinks, setFooterLinks] = useState<SiteSettingsLink[]>([]);
  const [socialLinks, setSocialLinks] = useState<SiteSettingsLink[]>([]);
  const [headerSlogan, setHeaderSlogan] = useState('');
  const [footerText, setFooterText] = useState('');
  const [copyright, setCopyright] = useState('');
  const [newsletterText, setNewsletterText] = useState('');

  // Initialize form when settings load
  useState(() => {
    if (settings) {
      setHeaderLinks(settings.headerLinks || []);
      setFooterLinks(settings.footerLinks || []);
      setSocialLinks(settings.socialMediaLinks || []);
      setHeaderSlogan(settings.headerSlogan || '');
      setFooterText(settings.footerText || '');
      setCopyright(settings.copyright || '');
      setNewsletterText(settings.newsletterSignupText || '');
    }
  });

  const handleSave = async () => {
    if (!settings) return;

    try {
      const updatedSettings: SiteSettings = {
        ...settings,
        headerLinks,
        footerLinks,
        socialMediaLinks: socialLinks,
        headerSlogan,
        footerText,
        copyright,
        newsletterSignupText: newsletterText,
      };

      await updateSettings.mutateAsync(updatedSettings);
      toast.success('Site settings updated successfully!');
    } catch (error) {
      console.error('Error updating site settings:', error);
      toast.error('Failed to update site settings. Please try again.');
    }
  };

  const addHeaderLink = () => {
    setHeaderLinks([
      ...headerLinks,
      { text: '', url: '', icon: '', order: BigInt(headerLinks.length) },
    ]);
  };

  const removeHeaderLink = (index: number) => {
    setHeaderLinks(headerLinks.filter((_, i) => i !== index));
  };

  const updateHeaderLink = (index: number, field: keyof SiteSettingsLink, value: string | bigint) => {
    const updated = [...headerLinks];
    updated[index] = { ...updated[index], [field]: value };
    setHeaderLinks(updated);
  };

  const addFooterLink = () => {
    setFooterLinks([
      ...footerLinks,
      { text: '', url: '', icon: '', order: BigInt(footerLinks.length) },
    ]);
  };

  const removeFooterLink = (index: number) => {
    setFooterLinks(footerLinks.filter((_, i) => i !== index));
  };

  const updateFooterLink = (index: number, field: keyof SiteSettingsLink, value: string | bigint) => {
    const updated = [...footerLinks];
    updated[index] = { ...updated[index], [field]: value };
    setFooterLinks(updated);
  };

  const addSocialLink = () => {
    setSocialLinks([
      ...socialLinks,
      { text: '', url: '', icon: '', order: BigInt(socialLinks.length) },
    ]);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index: number, field: keyof SiteSettingsLink, value: string | bigint) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-primary" />
            Site Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage header, footer, and global site content
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="gap-2"
        >
          {updateSettings.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="header" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="header" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Header Settings</CardTitle>
              <CardDescription>
                Configure header navigation links and slogan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="headerSlogan">Header Slogan</Label>
                <Input
                  id="headerSlogan"
                  value={headerSlogan}
                  onChange={(e) => setHeaderSlogan(e.target.value)}
                  placeholder="Enter header slogan"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Navigation Links</Label>
                  <Button onClick={addHeaderLink} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>

                {headerLinks.map((link, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="space-y-2">
                        <Label>Text</Label>
                        <Input
                          value={link.text}
                          onChange={(e) => updateHeaderLink(index, 'text', e.target.value)}
                          placeholder="Link text"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>URL</Label>
                        <Input
                          value={link.url}
                          onChange={(e) => updateHeaderLink(index, 'url', e.target.value)}
                          placeholder="/path"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Icon</Label>
                        <Input
                          value={link.icon}
                          onChange={(e) => updateHeaderLink(index, 'icon', e.target.value)}
                          placeholder="icon-name"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          onClick={() => removeHeaderLink(index)}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Footer Settings</CardTitle>
              <CardDescription>
                Configure footer content and links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="footerText">Footer About Text</Label>
                <Textarea
                  id="footerText"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  placeholder="Enter footer about text"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Footer Links</Label>
                  <Button onClick={addFooterLink} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>

                {footerLinks.map((link, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="space-y-2">
                        <Label>Text</Label>
                        <Input
                          value={link.text}
                          onChange={(e) => updateFooterLink(index, 'text', e.target.value)}
                          placeholder="Link text"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>URL</Label>
                        <Input
                          value={link.url}
                          onChange={(e) => updateFooterLink(index, 'url', e.target.value)}
                          placeholder="/path"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Icon</Label>
                        <Input
                          value={link.icon}
                          onChange={(e) => updateFooterLink(index, 'icon', e.target.value)}
                          placeholder="icon-name"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          onClick={() => removeFooterLink(index)}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Configure social media links for the footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Social Links</Label>
                  <Button onClick={addSocialLink} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>

                {socialLinks.map((link, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="space-y-2">
                        <Label>Platform</Label>
                        <Input
                          value={link.text}
                          onChange={(e) => updateSocialLink(index, 'text', e.target.value)}
                          placeholder="Facebook"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>URL</Label>
                        <Input
                          value={link.url}
                          onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Icon</Label>
                        <Input
                          value={link.icon}
                          onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                          placeholder="SiFacebook"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          onClick={() => removeSocialLink(index)}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure copyright and newsletter text
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="copyright">Copyright Text</Label>
                <Input
                  id="copyright"
                  value={copyright}
                  onChange={(e) => setCopyright(e.target.value)}
                  placeholder="© 2026. Built with love using caffeine.ai"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newsletter">Newsletter Signup Text</Label>
                <Input
                  id="newsletter"
                  value={newsletterText}
                  onChange={(e) => setNewsletterText(e.target.value)}
                  placeholder="Sign up for updates"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
