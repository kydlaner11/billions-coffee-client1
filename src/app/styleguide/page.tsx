// Halaman referensi design system — untuk cek visual token.
// Boleh dihapus sebelum production, atau simpan sebagai /styleguide internal.

import { Button } from "@/components/ui/button";

export default function StyleGuide() {
  return (
    <main className="min-h-screen bg-background px-6 py-32 md:px-16">
      <div className="mx-auto max-w-4xl space-y-24">
        {/* Display type */}
        <section className="space-y-6">
          <p className="text-eyebrow">Display — Cormorant Garamond</p>
          <h1 className="text-display text-6xl md:text-8xl">
            COFFE
            <br />
            SENSATION
          </h1>
          <h2 className="text-display text-4xl md:text-5xl">Book For Event</h2>
        </section>

        {/* Body type */}
        <section className="space-y-4">
          <p className="text-eyebrow">Body — Geist Sans</p>
          <p className="max-w-prose text-foreground">
            Where culinary craftsmanship meets modern elegance. Indulge in the
            finest experience, expertly curated to elevate your dining.
          </p>
          <p className="max-w-prose text-muted">
            Teks sekunder / muted untuk paragraf pendukung dan deskripsi kartu.
          </p>
          <p className="text-subtle text-sm">Label meta / caption kecil.</p>
        </section>

        {/* Color swatches */}
        <section className="space-y-6">
          <p className="text-eyebrow">Palette</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ["background", "bg-background"],
              ["surface", "bg-surface"],
              ["surface-2", "bg-surface-2"],
              ["border", "bg-border"],
              ["cream", "bg-cream"],
              ["foreground", "bg-foreground"],
              ["muted", "bg-muted"],
              ["accent", "bg-accent"],
            ].map(([name, cls]) => (
              <div key={name} className="space-y-2">
                <div
                  className={`h-20 w-full rounded-md border border-border ${cls}`}
                />
                <p className="text-subtle text-xs">{name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Surface / card sample */}
        <section className="space-y-6">
          <p className="text-eyebrow">Best Of Taste</p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-8">
              <h3 className="mb-3 text-2xl">Sushi Artistry Redefined</h3>
              <p className="text-muted">
                Kartu section dengan surface hangat, border tipis, dan heading
                serif. Ini pola dasar untuk semua block di landing.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-accent p-8">
              <h3 className="mb-3 text-2xl text-accent-fg">Accent Block</h3>
              <p className="text-accent-fg/80">
                Coklat tembakau untuk kartu menu kopi seperti di desain.
              </p>
            </div>
          </div>
        </section>

        <div className="flex gap-4 flex-wrap">
          <Button>Book A Table</Button>
          <Button variant="outline">Menu</Button>
          <Button variant="secondary">About</Button>
          <Button render={<a href="#" />} nativeButton={false}>As Link</Button>
        </div>
      </div>
    </main>
  );
}