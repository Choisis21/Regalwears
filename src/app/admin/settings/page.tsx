import { getSettings } from "@/lib/settings-store";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground">SEO & Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Site-wide search and social defaults. Individual products and posts can
        override these from their own SEO sections.
      </p>
      <div className="mt-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
