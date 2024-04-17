function dijkstra(graph, start) {
  const distances = {};
  const visited = {};
  const priorityQueue = new PriorityQueue();

  // Initialize distances from start to all other vertices as Infinity
  for (let vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;

  // Add start vertex to priority queue
  priorityQueue.enqueue(start, 0);

  while (!priorityQueue.isEmpty()) {
    const currentVertex = priorityQueue.dequeue().element;

    if (!visited[currentVertex]) {
      visited[currentVertex] = true;

      for (let neighbor in graph[currentVertex]) {
        const distance =
          distances[currentVertex] + graph[currentVertex][neighbor];
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          priorityQueue.enqueue(neighbor, distance);
        }
      }
    }
  }

  return distances;
}

// Priority Queue implementation
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element, priority) {
    this.queue.push({ element, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    if (!this.isEmpty()) {
      return this.queue.shift();
    }
    return null;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

// Example graph
const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 5, D: 10 },
  C: { A: 2, B: 5, D: 3 },
  D: { B: 10, C: 3 },
};

// Example usage
console.log(dijkstra(graph, "A"));
