import {GridItem} from "./components/GridItem";
import './App.css';
import CommitMessagesItem from "./components/github/CommitMessagesItem";
import WorkFlowJobItem from "./components/github/WorkFlowJobItem";
import {BranchMergedEvent} from "./components/github/BranchMergedEvent";
import IssuePullRequestComments from "./components/github/IssuePullRequestComments";
import EveryRollBarOccurence from "./components/rollbar/EveryRollBarOccurrence";
import EveryRollbarHighOccurrence from "./components/rollbar/EveryRollbarHighOccurrence";
import EveryRollBarNewOccurrence from "./components/rollbar/EveryRollBarNewOccurrence";
import CreatedIssuesJira from "./components/jira/CreatedIssuesJira";
import CompletedIssuesJira from "./components/jira/CompletedIssuesJira";
import JuniorEinsteinLogo from "./components/JuniorEinsteinLogo";

function App() {
  return (
    <div className="App">
            <GridItem>
                <CommitMessagesItem event='githubEvent'/>
            </GridItem>
            <GridItem>
                <WorkFlowJobItem event='githubEvent' />
            </GridItem>
            <GridItem>
                <IssuePullRequestComments event='githubEvent'/>
            </GridItem>
            <GridItem>
                <EveryRollBarNewOccurrence event='rollbarEvent'/>
            </GridItem>
            <GridItem>
                <EveryRollBarOccurence event='rollbarEvent'/>
            </GridItem>
            <GridItem>
                <EveryRollbarHighOccurrence event='rollbarEvent'/>
            </GridItem>
            <GridItem>
                <CreatedIssuesJira event='jiraEvent'/>
            </GridItem>
            <GridItem>
                <CompletedIssuesJira event='jiraEvent'/>
            </GridItem>
            <GridItem>
                <JuniorEinsteinLogo event='githubEvent'/>
            </GridItem>
        <BranchMergedEvent event='githubEvent'/>
    </div>
  );
}

export default App;
