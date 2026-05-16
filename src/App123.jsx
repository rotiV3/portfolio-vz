
import React from 'react';


export default function App() {
    const projects = [
        {
            title: 'Game Overlay',
            description: 'Desktop overlay to display real-time contextual information during gameplay. Built with C# to practice UI rendering and event handling.',
            tech: ['C#', '.NET'],
            github: '#',
        },
        // add more projects here
    ];


    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
            <header className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between py-6">
                    <div>
                        <h1 className="text-3xl font-bold">Vitor Zezere</h1>
                        <p className="text-sm">Junior C# Developer — Gloucester, UK</p>
                        <p className="text-sm">vitor.zezere@gmail.com • github.com/rotiV3</p>
                    </div>
                    <nav>
                        <a href="#projects" className="px-3 py-2">Projects</a>
                        <a href="#contact" className="px-3 py-2">Contact</a>
                    </nav>
                </div>
            </header>


<main className="max-w-4xl mx-auto space-y-8">
<section id="about" className="bg-white p-6 rounded shadow">
<h2 className="text-2xl font-semibold mb-2">About me</h2>
<p>
Junior C# Developer with a practical background in process improvement and MVP development. Passionate about building applications that solve real problems. Strong in teamwork, problem solving and fast learning.
</p>
</section>


<section id="skills" className="bg-white p-6 rounded shadow">
<h2 className="text-2xl font-semibold mb-2">Skills</h2>
<ul className="grid grid-cols-2 gap-2">
<li>C#</li>
<li>.NET</li>
<li>ASP.NET Core</li>
<li>WPF</li>
<li>SQL Server</li>
<li>MySQL</li>
<li>Git</li>
<li>Docker</li>
<li>Excel (Advanced)</li>
</ul>
</section>


<section id="projects" className="bg-white p-6 rounded shadow">
<h2 className="text-2xl font-semibold mb-4">Projects</h2>
<div className="space-y-4">
{projects.map((p, idx) => (
<article key={idx} className="p-4 border rounded">
<h3 className="text-xl font-bold">{p.title}</h3>
<p className="mt-2">{p.description}</p>
<p className="mt-2 text-sm">Tech: {p.tech.join(', ')}</p>
<a href={p.github} className="text-blue-600 mt-2 inline-block">View on GitHub</a>
</article>
))}
</div>
</section>


<section id="contact" className="bg-white p-6 rounded shadow">
<h2 className="text-2xl font-semibold mb-2">Contact</h2>
<p>Email: vitor.zezere@gmail.com</p>
<p>GitHub: <a href="https://github.com/rotiV3" className="text-blue-600">github.com/rotiV3</a></p>
</section>
</main>


<footer className="max-w-4xl mx-auto text-center py-6 text-sm text-gray-600">
© {new Date().getFullYear()} Vitor Zezere — Built with React
</footer>
</div >
);
}
