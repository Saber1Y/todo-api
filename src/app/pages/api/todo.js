let todos = [];

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            res.status(200).json(todos)
            break;
        case "POST":
            try {
                const newTodo = req.body;
                todos.push(newTodo);
                res.status(200).json({ message: "todo created succesfully" })

            } catch (error) {
                res.status(500).json({ message: "error creating todos" })
            }
            break;
        case "PUT":
            try {
                const { id } = req.query;
                const updatedTodo = todos.findIndex((todo) => todo.id === id);
                if (index !== -1) {
                    todos[index] = updatedTodo;
                    res.status(200).json({ message: 'todo updated succesfully' })
                } else {
                    res.status(404).json({ message: 'todo not found' })
                }
            } catch (error) {
                res.status(500).json({ message: 'error updating todo' })
            }
            break;
        case "DELETE":
            try {
                const { id } = req.query;
                const index = todos.findIndex((todo) => todo.id === id);
                if (index !== -1) {
                    todos.splice(index, 1);
                    res.status(200).json({ message: 'Todo deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Todo not found' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Error deleting todo' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }

}