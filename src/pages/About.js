// About.js
import React from 'react';

const About = () => {
  return (
    <div className='p-8 text-center'>
      <h1 className='text-4xl font-arcade text-neonRed'>About $SHOOP</h1>

      {/* Add the GIF below the H1 */}
      <div className='mt-4'>
        <img
          src='/images/gifs/shoop_da_whoop_w1.gif'
          alt='$SHOOP GIF'
          className='mx-auto rounded-lg shadow-lg'
        />
      </div>

      {/* Button to open DexTools chart in a new tab */}
      <div className='mt-8'>
        <a
          href='https://www.dextools.io/app/en/solana/pair-explorer/3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump?t=1727281472150'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-neonRed text-white px-4 py-2 rounded hover:bg-neonYellow transition duration-200 ease-in-out'>
          View $SHOOP Chart on DexTools
        </a>
      </div>

      {/* About $SHOOP Section */}
      <div className='mt-8 bg-black text-white p-4 border border-neonFuschia rounded'>
        <h2 className='text-2xl text-neonYellow'>About $SHOOP</h2>
        <p className='mt-4'>
          $SHOOP isn’t just another memecoin. We’re not here to promise the moon or overhype our token’s price. Instead, we’re quietly building a community around value—real value—hidden in plain sight. Whether it’s utility, tools, or new connections, we’re aiming to be the most valuable memecoin community out there. We’re the ones adding 10x the value before you even see the price move.
        </p>
        <p className='mt-4'>
          Every week, we’re layering in new tools, Easter eggs, and little treasures just for our $SHOOP holders. Think of it as a constantly evolving scavenger hunt, where the real prize isn’t some arbitrary number on a chart, but the community, the connections, and the utility we build along the way.
        </p>
        <p className='mt-4'>
          Many people speculate what SHOOP stands for, but it’s certainly true if you stuck with{' '}
          <span className='text-neonFuschia'>
            'Seek Hidden Opportunities Over Price'
          </span>. We’re always aiming to hide way more value than you’ll ever see reflected in the current price of this token. There’s value in Community, and there’s value in utility. And there’s immense value in aligning yourself with a community whose main focus is to add value to your life—not just to pump a token price, but to provide actual, tangible tools, information, relationships, business opportunities, investment groups, and a collective experience that far outweighs what we are as individuals. It’s basic Shoopenomics.
        </p>
        <p className='mt-4'>
          With $SHOOP, it’s all about the community. Whether it’s exclusive airdrops, fun challenges, or hidden perks, being part of the $SHOOP family means never missing out on extracting as much value as you want for you, your friends, and your family from the multitude of ever-expanding opportunities. This isn’t just another memecoin—it’s a paradigm shift from what most of us are used to. If you’re interested in getting involved,{' '}
          <a
            href='https://pump.fun/3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump'
            className='text-neonYellow underline'
            target='_blank'
            rel='noopener noreferrer'>
            grab some $SHOOP
          </a>
          and join us. You’re exactly who we’ve been looking for.
        </p>
        <p className='mt-4 text-neonFuschia'>
          Simply Hodl Onto Once, Perpetually and Forever (or, $SHOOP and Forever).
        </p>
        <p className='mt-4'>
          We’re not just here for the hype—we’re here for the long game.
        </p>
      </div>
    </div>
  );
};

export default About;
