<template>
  <div class="flex-col gap-4">
    <ElementHeading :cursor="true">About Me</ElementHeading>
    <div>
      <ElementHeading :heading="2">Who are you?</ElementHeading>
      <div class="flex flex-row">
        <div class="basis-6 shrink-0"></div>
        <div class="flex flex-col gap-2">
          <p>
            My name is Pawel. Online, you know me as FloppyDisk.
            Currently living near Vancouver, BC.
          </p>
          <p>
            At the age of 13, I endeavoured to learn as much as I could about
            the things that fascinate me: web development, video editing,
            motion graphics, vector art, 3D modeling and animation, game development,
            music, and physics.
          </p>
          <p>
            This is my lifelong mission but my focus is now on breaking into 
            the web development industry and to bring my interactive visions to life.
          </p>
        </div>
      </div>
    </div>
    <div>
      <ElementHeading :heading="2">What is this?</ElementHeading>
      <div class="flex flex-row">
        <div class="basis-6 shrink-0"></div>
        <div class="flex flex-col gap-2">
          <p>
            This website is a personal project of mine;
            a custom-made link aggregator that is also intended as a 
            quasi-ARG (alternate reality game) in the form of a 
            terminal like you would see when using Linux or WSL.
          </p>
          <p>
            I am always adding to this site so be sure to check back! 
          </p>
        </div>
      </div>
    </div>
    <div>
      <ElementHeading :heading="3">Try it out!</ElementHeading>
      <div class="flex flex-row">
        <div class="basis-6 shrink-0"></div>
        <div class="flex flex-col gap-2">
          <p>
            Click into the terminal behind this window and you should
            see a cursor appear. Start by typing "help" and pressing your enter key;
            a list of commands will appear showing what you can type next!
            Try typing "colour yellow" and pressing your enter key. The terminal is now yellow :O
          </p>
          <p>
            To hide the window covering your terminal, click the '-' dash button in the top left of your screen.
          </p>
        </div>
      </div>
    </div>
    <div>
      <ElementHeading :heading="2">How is this site hosted?</ElementHeading>
      <div class="flex flex-row">
        <div class="basis-6 shrink-0"></div>
        <div class="flex flex-col gap-2">
          <p>
            I am hosting this site using DigitalOcean's App Platform with APIs
            running on the edge using Cloudflare Workers and Workers KV. And the best part: it
            is completely free!
          </p>
          <div class="flex w-full gap-2">
            <ElementButton class="w-auto h-10 px-1" @click="goToLink('https://m.do.co/c/c002220143af')">
              <font-awesome-icon
                class="fa-2x scale-75"
                :icon="[
                  'fab',
                  'digital-ocean'
                ]"
              />
              <div class="ml-1 text-sm">
                <div>Powered by <span class="font-bold">DigitalOcean</span></div>
                <div class="text-xs">Get $200 dollars to start!</div>
              </div>
            </ElementButton>
          </div>
          <p>
            To see the source code for this site, click the 'maximize' button (box icon)
            in the top-right of the terminal window.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const goToLink = (href: string) => {
  window.open(href, '_blank', 'noopener')
}
</script>
