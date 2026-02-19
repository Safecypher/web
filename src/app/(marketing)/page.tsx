import { Button, Card, CardBody, CardTitle, Badge, Input } from '@/components/ui'

export default function HomePage() {
  return (
    <main className="min-h-screen p-8 bg-base-100">
      <h1 className="text-4xl font-bold text-base-content mb-8">
        SafeCypher Design System
      </h1>
      <p className="text-base-content/60 mb-8">
        [PLACEHOLDER — Homepage content in Phase 2]
      </p>

      <section className="space-y-8">
        <div className="space-x-4">
          <Button variant="primary">Request Demo</Button>
          <Button variant="secondary">Learn More</Button>
          <Button variant="accent">Get Started</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
        </div>

        <div className="space-x-4">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="accent">New</Badge>
          <Badge variant="neutral">Beta</Badge>
        </div>

        <Card className="max-w-md">
          <CardBody>
            <CardTitle>An Post Partnership</CardTitle>
            <p className="text-base-content/80">
              800,000+ transactions. Zero CNP fraud.
            </p>
            <Button variant="primary" size="sm">Learn more</Button>
          </CardBody>
        </Card>

        <Input
          label="Work Email"
          type="email"
          placeholder="you@company.com"
          helpText="We'll send you a demo link"
          fullWidth
          className="max-w-sm"
        />
      </section>
    </main>
  )
}
