const Header = (props) => {
    return(
        <div>
            <h2>{props.course.name}</h2>
        </div>
    )
}
const Part = (props) => {
    return(
        <>
            <p>{props.part.name} {props.part.exercises}</p>
        </>
    )
}
const Content = ({parts}) => {
    return(
        <div>
            {parts.map(part => <Part part={part} key={part.id}/>)}
        </div>
    )
}
const Total = ({parts}) => {
    return(
        <>
            <p>Number of exercises {parts.reduce((acc, obj) => acc + obj.exercises, 0)}</p>
        </>
    )
}


const Course = ({course}) => {
    return(
        <div>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}
export default Course