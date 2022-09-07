# App Technology

- Status: accepted
- Deciders: Florian Wiech
- Date: 2022-03

## Context and Problem Statement

Which technologies should I use for my developer scratchpad?

## Decision Drivers

- multi-platform (starting with macOS)
- advanced editing experience
  - keyboard shortcuts (customizable)
  - features like multi-cursor, syntax highlighting, ...
- file system interaction
- offline usage
- maintainable in free time
- open-source capable

## Considered Options

- Native app with web technologies
- Web app
- SwiftUI for macOS

## Decision Outcome

Chosen option: "native app with web technologies", because has a stable ecosystem with up-to-date standards.
A native app is something I would rather use than yet another website that claims to not store any data.

## Pros and Cons of the Options

### Native app with web technologies

Use technologies like Electron to create the application.

- Good, because there is a huge ecosystem with great libraries that can help me out.
- Good, because I can leverage web technologies (that I'm used to).
- Bad, because electron needs a lot of resources to run.
- Bad, because app will never really feel native (although you can get close to it).

### Web app

Building a single page application that is offline capable thanks to service workers.
It is multi-platform and with the file-system API it is possible to access the local files.
Thanks to advanced libraries, stable code editor libraries can be used.

- Good, because everything covered with the web ecosystem.
- Bad, because browser extensions or websites do not feel native. It is rather yet another website.

### SwiftUI for macOS

Thanks to SwiftUI Apple really found a perspective how ui development could look like in the future.

- Good, because truly native look & feel.
- Bad, because SwiftUI is not fully ready yet.
  - And since I'm not planning to getting a macOS native developer I do not have time to fully learn AppKit.
- Bad, because I have no experience in the native macOS area.
  - Will take quite some time to learn and fully embrace it (but I would like to).
  - Will be hard to maintain an application written in a stack that I'm not used to.
- Bad, because I did not find any good editor libraries I can rely on.
- Bad, because only Apple ecosystem is supported. I can not really port it to different platforms.
