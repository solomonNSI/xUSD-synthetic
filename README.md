# Hyperlane Warp Route UI Template

This repo contains an example web interface for a interchain tokens built with [Hyperlane Warp Route](https://docs.hyperlane.xyz/docs/apis-and-sdks/warp-api). Warp is a framework to permisionlessly bridge tokens to any chain.

## Architecture

This app is built with Next+React, Wagmi, RainbowKit, and the Hyperlane SDK.

- The index page is located at `./src/pages/index.tsx`
- The primary features are implemented in `./src/features/`
- Constants that you may want to change are in `./src/consts/`, see the following Customization section for details.

# Addresses of xUSD
For linea: 0x3c8F6070dEd3699F584656822c1b89d5aB3F3192

For base: 0x9435c5C968F1fc6B8fB709b6612FE89d977d204c

For goerli: 0x1C106456CebBe0991acfAA5297bE20A701aAaCD1

## Customization

See [CUSTOMIZE.md](./CUSTOMIZE.md) for details about adjusting the tokens and branding of this app.

## Development

### Setup

```sh
# Install dependencies
yarn

# Build Next project
yarn build
```

### Run

```sh
# Start the Next dev server
yarn dev
```

### Test

```sh
# Lint check code
yarn lint

# Check code types
yarn typecheck
```

### Format

```sh
# Format code using Prettier
yarn prettier
```

### Clean / Reset

```sh
# Delete build artifacts to start fresh 
yarn clean
```

## Deployment

The easiest hosting solution for this Next.JS app is to create a project on Vercel.

## Learn more

For more information, see the [Hyperlane documentation](https://docs.hyperlane.xyz/docs/apis-and-sdks/warp-api).
