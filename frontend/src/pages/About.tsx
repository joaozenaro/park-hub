import { Button } from "../components/ui/Button";

export default function About() {
  return (
    <div className="grid place-items-center h-full w-full">
      <h1>About</h1>
      <Button>
        Default
      </Button>
      <Button type="brand">
        BrandColor
      </Button>
      <Button type="primary">
        Primary
      </Button>
      <Button type="secondary">
        Secondary
      </Button>
      <Button type="tertiary">
        Tertiary
      </Button>
      <Button type="danger">
        Danger
      </Button>
      <Button type="success">
        Success
      </Button>
    </div>
  )
}