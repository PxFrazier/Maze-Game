export class Graph
{
    constructor(start_node)
    {
        this.graph   = new Map();
        this.current = start_node;

        this.operations = {
            set:        (key, ...values)=>{return this.graph.set(key, new Set(values))},
            get:        (key)           =>{return this.graph.get(key)},
            delete:     (key)           =>{return this.graph.delete(key)},
            isAdjacent: (from, to)      =>{return this.graph.get(from).has(to)}
        };

        this.specs = {
            nodes: ()=>{return this.graph.size},
            edges: ()=>{
                let value = 0;
                this.graph.forEach(entry=>{
                    value += entry.size;
                });
                return value / 2;
            }
        };

        this.traverse = (to)=>{
            if(this.operations.isAdjacent(this.current, to))
                this.current = to;
        }
    }

    static isGraph = (object)=>{return object instanceof Graph}
}