import {GridItem} from "./components/GridItem";
import './App.css';
import CommitMessagesItem from "./components/CommitMessagesItem";
import WorkFlowJobItem from "./components/WorkFlowJobItem";

function App() {
  return (
    <div className="App">
            <GridItem>
                <CommitMessagesItem event="commit_comment"/>
            </GridItem>
            <GridItem>
                <WorkFlowJobItem event='workflow_job' />
            </GridItem>
            <GridItem>Component 3</GridItem>
            <GridItem>Component 4</GridItem>
            <GridItem>Component 5</GridItem>
            <GridItem>Component 6</GridItem>
            <GridItem>Component 7</GridItem>
            <GridItem>Component 8</GridItem>
            <GridItem>Component 9</GridItem>
    </div>
  );
}

export default App;
