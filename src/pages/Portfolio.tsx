import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { projects, categories, Project } from '@/data/portfolio';
import { toast } from 'sonner';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === '全部' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">我的作品集</h1>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category 
                    ? 'bg-teal-500 hover:bg-teal-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                onClick={() => openProjectDetail(project)}
                className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 bg-gray-700 text-sm rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 项目详情弹窗 */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeProjectDetail}
        >
          <div 
            className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <button 
                  onClick={closeProjectDetail}
                  className="text-gray-400 hover:text-white"
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
              </div>

              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {selectedProject.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${selectedProject.title}截图${index + 1}`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>

                <p className="text-gray-300 mb-4">{selectedProject.description}</p>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">技术栈</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map(tech => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-gray-700 rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-md transition-colors"
                  >
                    <i className="fa-solid fa-link mr-2"></i>
                    查看项目
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
