import TextWithExplainerOverlay from "./TextWithExplainerOverlay"

const WhitePaper = () => {
  return <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl w-full space-y-2 text-slate-900">
      <h1 className="text-4xl font-bold text-slate-500">The White Paper</h1>
      <br />
      <h3 className="text-2xl">Abstract</h3>
      <p>Debate on the Internet is <b>fundamentally broken</b>. On Facebook, people take <b>incendiary stances</b> because those arguments garner more engagement. To make matters worse, the business model of Facebook is to capitalize on engagement, so social networks themselves are incentivized to <b>promote hateful</b> and <b>misinformed</b> content. We could trust platforms to mediate arguments, but their profit-motive is inherently at odds with moderation. We could trust the government to intervene, but even a high-functioning democracy is slow-to-act by design, as a result of intentional checks and balances (not to mention Orwell's warnings about a "Ministry of Truth"). The only way to address the misinformation and polarization problem is to <b>change</b> the <b>underlying incentives</b>.</p>
      <p>Socratiq is an experiment in debating truth on the Internet with a prescriptive set of incentives that encourage thoughtful, nuanced conversation.</p>
      <p>The <b>Guiding Principles</b> are:</p>
      <ul className="list-disc list-inside">
        <li>The best Arguments are supported by Facts, not by money or tribalism.</li>
        <li>The best Facts are supported by multiple, diverse Sources, and are <b>relevant</b> and <b>significant</b> to the Argument.</li>
        <li>The best Sources are <b>unbiased</b>, <b>uncontroversial</b>, and associated with Institutions that have a history of supporting persevering Facts.</li>
        <li>The best Debaters are rewarded for crafting trees of Arguments, Facts, and Sources that stand the test of time.</li>
        <li>The best Debaters focus on exploring Facts and Sources, rather than arbitrarily picking sides in an Argument.</li>
      </ul>
      <br />
      <h3 className="text-2xl">A Word of Warning</h3>
      <p>Socratiq is <b>just a game</b>, closer to Online Poker than Wikipedia. The Arguments, Facts, and Sources produced by this community may offer a profoundly novel approach to navigating truth, or they may be partisan propaganda, a scam to steal money from well-intentioned but naive intellectuals, or a silly exercise in post-truth absurdism. The point of Socratiq is to experiment with the governance of truth on the Internet, not to assert that the resulting content will be unequivocally "true" or "right". Proceed with cautious optimism and a sense of humor!</p>
      <br />
      <br />
      <h2 className="text-3xl font-bold text-slate-500">The Tokens</h2>
      <h3 className="text-2xl">Veracity Points</h3>
      <p><b>Money cannot influence</b> truth on Socratiq, so the only token that governs truth on Socratiq <b>cannot be bought or sold</b>. It is called <b>Veracity</b>. <TextWithExplainerOverlay
        text="Every Debater is airdropped a few Veracity Points as soon as they join" explainer={
        <p><span className="italic">Initial Veracity Allocation</span> refers to how many Veracity Points are airdropped to new Debaters. Increasing the <span className="italic">Initial Veracity Allocation</span> introduces risk of fraud. Decreasing it reduces first time Debater engagement.</p>
      } />. After that, Veracity Points can only be earned by committing Veracity Points to Facts and Sources.</p>
      <p>Moderation of all content on Socratiq is managed by the largest holders of Veracity Points, known as Socratiq Moderators.</p>
      <p>Debaters can commit Veracity Points to a Source when they believe that Source to be <b>valid</b>, <b>independent from bias</b>, and <b>rigorously in support</b> of the linked Fact. They can commit against it if they don't.</p>
      <p>Debaters can also commit 1 Veracity Point to <b>1 Fact per Argument</b>, to indicate that they believe that Fact to be the <b>most relevant</b> and <b>significant</b> Fact in the Argument.</p>
      <br />
      <h3 className="text-2xl">MATIC Tokens</h3>
      <p>Socratiq runs on <b>Polygon</b>, which is a way to use Ethereum <b>without causing undue environmental harm</b> or incurring lots of gas fees.</p>
      <p>Polygon runs on MATIC tokens, which can be bought and sold on any cryptocurrency exchange.</p>
      <p>When a Debater is ready to start a Debate, they <b>commit any amount of MATIC to an Argument</b>, for example: committing 100 MATIC in support of the Argument that "Assault rifles should be illegal in the United States". Other Debaters can commit MATIC in support or opposition of that Argument before it starts. Once the Argument ends, the <b>MATIC tokens are redistributed</b> based on the <b>balance of Veracity Points</b>.</p>
      <p>Committed MATIC tokens have no impact on the determination of truth or the outcome of a debate, but they provide all of the financial incentive to participate in debates. MATIC tokens are also <b>paid to Socratiq Moderators</b> for moderation tasks.</p>
      <br />
      <br />
      <h2 className="text-3xl font-bold text-slate-500">Sources</h2>
      <p><b>Guiding Principle</b> The best Sources are <b>unbiased</b>, <b>uncontroversial</b>, and associated with Institutions that have a <b>history</b> of <b>supporting persevering Facts</b>.</p>
      <br />
      <p>An <b>Op-Ed article</b> is <b>not</b> truly a <b>Source</b>. A Tweet is only a Source if the Fact it's supporting is something like "Elon Musk tweeted about DogeCoin". In other words, Socratiq Debaters <b>seek out primary Sources</b> with a focus on <b>objectivity</b>. Carefully collected data sets and peer-reviewed papers aren't perfect, but in aggregate, when organized in support of a Fact, they can begin to paint a picture of objectivity.</p>
      <p>Socratiq assumes that <b>all Sources are imperfect</b>, because they are provided by humans, and humans are inherently biased. So the goal of Socratiq is not to identify perfect Sources. The goal is to identify and collect all of the Sources that are <b>reasonably unbiased</b>, and then weigh them against each other. For example, Government-sourced data sets may be distrusted by libertarians, while Corporate-sourced data sets may be distrusted by communists. The goal is to include both in an aggregate understanding of the truth, as opposed to excluding either with an arbitrarily precise purity test.</p>
      <p>Socratiq incentivizes Debaters to find <b>uncontroversial Sources</b> and <b>commit Veracity Points</b> to them. Once Veracity Points are committed in favor or opposing a Source, they cannot be uncommitted.</p>
      <p>At the end of an Argument, if <TextWithExplainerOverlay
        text="more than 90% of Veracity Points" explainer={
        <p><span className="italic">Unquestionability Threshold</span> refers to the required percent of favorably committed Veracity to a Source to designate it as objective. Decreasing the threshold encourages more subjective, questionable Sources. Its relationship to the <span className="italic">Questionability Threshold</span> (e.g. 90% vs 50%) determines whether Debaters spend more time searching for controversial Sources to attack, as opposed to valid Sources to support.</p>
      } /> committed to a Source are committed <b>in favor</b> of that Source, everyone who has committed Veracity Points in favor of that Source is <TextWithExplainerOverlay
        text={"airdropped more Veracity Points"} explainer={
        <p><span className="italic">Valid Source Identification Reward</span> refers to how many Veracity Points are airdropped as a reward for identifying a valid source. It is always above 1, because the perpetually committed token must be replaced. Increasing the <span className="italic">Valid Source Identification Reward</span> can lead to Veracity inflation, allowing Debaters who are often wrong to still have sway on Arguments. Decreasing it unlocks ongoing Debater engagement.</p>
      }/>.</p>
      <p>If <TextWithExplainerOverlay
        text="more than 50% of Veracity Points" explainer={
        <p><span className="italic">Questionability Threshold</span> refers to the required percent of Veracity committed in opposition to render a Source invalid. Invalid Sources are not included in the <span className="italic">Argument Resolution Function</span>.</p>
      } /> are committed <b>against</b> a Source, the opposers are airdropped more Veracity. This encourages Debaters to commit Veracity Points in favor of unbiased sources, and against biased Sources, <b>regardless of whether they agree</b> with the associated Argument.</p>
      <p>New Veracity Points are airdropped at the end of an Argument, and the only way that committed Veracity can be uncommitted or redistributed is if a Source is overturned after an Argument has ended. Any Source with more than 90% of Veracity in support is <TextWithExplainerOverlay 
        text="liable to being overturned" explainer={
        <p>As the total quantity of Veracity Points grows, this disincentive may not be sufficient to discourage support of short-term “conventional wisdom” that gets overturned in the long-term. In that case, an additional penalty of confiscated Veracity could be implemented.</p>
      } />, <b>in perpetuity</b>. If a Debater determines that new Facts have come to light which undermine the independence or validity of a Source, they can start a new <b>Overturning Argument</b>. If they win the Argument, all of the Veracity Points originally committed in favor of that Source and its Fact are redistributed to the Debaters who originally committed in opposition.</p>
      <p>A Source can also be associated with an Institution. For example, if an academic paper is published in Nature, the paper itself is the Source and the journal (Nature) is an Institution. <TextWithExplainerOverlay 
        text="Every Institution has a Trust Score" explainer={
          <p><span className="italic">Institution Trust Score</span> is the number of valid Sources associated with an Institution, as long as the percent of valid Sources for that Institution is above the <span className="italic">Unquestionability Threshold</span>, where invalid and overturned Sources are both included in the denominator.</p>
        } />, based on the Sources it has been associated with. The Trust Scores of associated Institutions are included in the Veracity Point tally that determines who wins an Argument.</p>
      <br />
      <br />
      <h2 className="text-3xl font-bold text-slate-500">Facts</h2>
      <p><b>Guiding Principle</b> The best Facts are supported by <b>multiple</b>, <b>diverse Sources</b>, and are <b>relevant</b> and <b>significant</b> to the Argument.</p>
      <br />
      <p>The quality and quantity of a Fact's Sources determine whether it is considered "true". But it's not enough that a Fact is true, it must also be <b>relevant</b> and <b>significant</b> to the Argument.</p>
      <p>Debaters commit 1 Veracity Point on a Fact to indicate that they find it to be the <b>most</b> relevant and significant Fact in judging the Argument. They can <b>only commit 1</b> Veracity Point to a Fact <b>per Argument</b>.</p>
      <p>Socratiq encourages Debaters to judge Facts without bias for position. In other words, Debaters are incentivized to commit Veracity in favor of a Fact even if they disagree with it, as long as they believe <b>most people</b> will find it to be the <b>most relevant</b> and significant to the Argument. </p>
      <p>Unlike Sources, which should be uncontroversial (either valid or not), there is a spectrum of significance among Facts. For example, it is very significant that lots of people would die in a nuclear war, and only slightly significant that a nuclear war would deplete some of a country's nuclear arsenal. Both Facts are unequivocally and equally true, but the degree to which each Fact is considered in the final tally of points is weighted by their significance.</p>
      <p>At the end of the Argument, Veracity Points are airdropped to each Debater based on <b>what percentage of Debaters agreed</b> with them in identifying the <TextWithExplainerOverlay
        text="most relevant and significant Fact" explainer={
          <p><span className="italic">Fact Significance Quotient</span> refers to the percent of Debaters who identified a given Fact as the most significant in that Argument. If a Debater commits 1 Veracity Point to a Fact that 20% of other Debaters agree is the most relevant and significant Fact, that Debater would be airdropped 1.2 Veracity Points (1 to replace the committed token, and 0.2 to represent the 20% consensus). Socratiq Moderators should adjust the <span className="italic">Valid Source Identification Reward</span> to ensure that the rough odds of receiving Veracity from Fact commitments are equal to the odds when making Source commitments.</p>
        } />.</p>
      <br />
      <br />
      <h2 className="text-3xl font-bold text-slate-500">Arguments</h2>
      <p><b>Guiding Principle</b> The best Arguments are supported by Facts, <b>not by money</b> or <b>tribalism</b>.</p>
      <br />
      <p>The Betting Window begins as soon as an Argument is submitted. During the Betting Window, any Debater can commit as much MATIC as they want, either supporting or in opposition to the Argument.</p>
      <p>Once the Betting Window has closed the Argument begins, allowing Debaters to submit Facts and Sources, and commit Veracity Points to them. Any Moderator can mark an Argument as complete when they determine that the <b>balance</b> of Veracity Points is <b>no longer oscillating</b> significantly. This non-deterministic length of Arguments helps deter fraud.</p>
      <p>After the Argument ends, all MATIC committed to the losing side is redistributed to the <TextWithExplainerOverlay
        text="winning side" explainer={
          <p><span className="italic">Argument Resolution Function</span> refers to the way Veracity Points are counted to determine which side wins the Argument. Only valid Sources are counted. The Source score is equal to the Veracity Points committed to a Source in addition to the sum of Institution Trust Scores of any associated Institutions (any given Institution's Trust Score is evenly divided across all associated Sources on the same side of the Argument, so as not to be double counted). Every valid Source's score is multiplied by its associated Fact's Significance Quotient. The sums of both sides are compared.</p>
        } />, based on how much each of the winning Debaters committed in the first place. For example, if a Debater commits 10% of the MATIC committed to the winning side, they'll collect 10% of all the MATIC committed to the losing side. This simple structure encourages Debaters to bet in support of <b>controversial</b> or <b>unorthodox</b> positions, as opposed to boring or conventional platitudes.</p>
      <br />
      <br />
      <h2 className="text-3xl font-bold text-slate-500">Moderation</h2>
      <p>Socratiq Moderators are responsible for <b>disqualifying</b> Arguments, Sources, and Facts. Every Argument, Source, and Fact has to be reviewed, and a small payment of MATIC is issued for each review, regardless of whether the Moderator decides to disqualify. Moderators with an <TextWithExplainerOverlay
        text="Aberrant Disqualification Rate" explainer={
          <p><span className="italic">Aberrant Disqualification Rate</span> refers to a percent of Arguments, Sources, or Facts reviewed by a Socratiq Moderator which were disqualified. When that percent is aberrant from the mean to a statistically significant degree, it is cause for intervention.</p>
        } /> will be notified, and eventually stripped of Moderator status if their rate doesn't revert to the mean.</p>
      <p>There are a wide array of reasons an Argument, Source, or Fact can be disqualified including, but not limited too:</p>
      <ul className="list-disc list-inside">
        <li><b>Poorly-structured</b> e.g. a Fact that should be a Source</li>
        <li><b>Inappropriate</b> e.g. hate speech</li>
        <li><b>Redundant</b> e.g. the Fact has already been submitted</li>
        <li><b>Confusing</b> e.g. the point of the Argument is hard to understand</li>
      </ul>
      <p>Moderators determine when a given Argument is effectively stable, and mark it as complete.</p>
      <p>Moderators are also responsible for linking Sources to Institutions.</p>
      <p>Lastly, Moderators vote on material platform changes, for example, changing a parameter to one of the underlying equations. Their votes are weighted by how many Veracity Points they hold.</p>
      <br />
      <br />
      <h2 className="text-3xl font-bold text-slate-500">Sybil Resistance</h2>
      <p>The most significant vulnerability to fraud is in the assumption that one wallet equals one Debater. Integrating with a service like BrightID may be necessary. Twitter login (and a check for at least 25 followers) may also be a simple (though centralized) way to add Sybil Resistance. We will finalize an approach before launching to the production Polygon chain.</p>
    </div>
  </div>
}

export default WhitePaper