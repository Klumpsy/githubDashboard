import {GridItem} from "./components/GridItem";
import './App.css';
import CommitMessagesItem from "./components/CommitMessagesItem";
import WorkFlowJobItem from "./components/WorkFlowJobItem";
import {BranchMergedEvent} from "./components/BranchMergedEvent";
import IssuePullRequestComments from "./components/IssuePullRequestComments";
import EveryRollBarOccurence from "./components/EveryRollBarOccurrence";
import EveryRollbarHighOccurrence from "./components/EveryRollbarHighOccurrence";
import EveryRollBarNewOccurrence from "./components/EveryRollBarNewOccurrence";

function App() {
  return (
    <div className="App">
            <GridItem>
                <CommitMessagesItem event="commit_comment"/>
            </GridItem>
            <GridItem>
                <WorkFlowJobItem event='workflow_job' />
            </GridItem>
            <GridItem>
                <IssuePullRequestComments event='issue_pullrequest_comments'/>
            </GridItem>
            <GridItem>
                <EveryRollBarNewOccurrence event='every_new_occurrence'/>
            </GridItem>
            <GridItem>
                <EveryRollBarOccurence event='every_occurrence'/>
            </GridItem>
            <GridItem>
                <EveryRollbarHighOccurrence event='every_tenth_occurrence'/>
            </GridItem>
            <GridItem>
                Component 7
            </GridItem>
            <GridItem>
                Component 8
            </GridItem>
            <GridItem>
                Component 9
            </GridItem>
        <BranchMergedEvent/>
    </div>
  );
}

export default App;
