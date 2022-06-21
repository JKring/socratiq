import { Link } from "react-router-dom"

const VeracityPoints = () => {
  return <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl w-full space-y-4 text-slate-900">
      <h1 className="text-3xl font-bold text-slate-500">Veracity Points</h1>
      <p>The point of Socratiq is to foster <b>nuanced</b>, <b>thoughtful</b>, and <b>research-backed</b> debate. <b>Veracity Points</b> are how we encourage that sort of rigorous thinking.</p>
      <p>Everyone starts with <b>three</b> Veracity Points, but you can lose or earn more, depending on your behavior in Arguments.</p>
      <p>People with lots of Veracity Points have more control over who is deemed the winner or loser of an Argument, and as a result, more opportunity to earn real money on Socratiq.</p>
      <p>The specifics are <Link className="text-indigo-500" to='/white-paper'>kind of complicated</Link>. But here's the tl;dr.</p>
      <p>There are three ways to earn more Veracity Points:</p>
      <ul className="list-disc list-inside">
        <li>Commit Veracity in support of the <b>most relevant</b> and <b>signicant</b> Fact in any Argument.</li>
        <li>Commit Veracity in support of <b>unbiased</b> and <b>uncontroversial</b> Sources.</li>
        <li>Commit Veracity in opposition to <b>biased</b> Sources.</li>
      </ul>
      <p>That's it! As long as you follow those three simple rules, you'll earn more Veracity Points.</p>
    </div>
  </div>
}

export default VeracityPoints