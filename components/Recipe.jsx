import ReactMarkdown from "react-markdown"

export default function Recipe(props) {
    return (
        props.recipeIdea !== "" ? (
            <>
                <h1>Suggested Recipe:</h1>    
                <article>
                    <ReactMarkdown>{props.recipeIdea}</ReactMarkdown>
                </article>
            </>
        ) : null
    );
}