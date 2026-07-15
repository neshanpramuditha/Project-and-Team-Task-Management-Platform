import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getProjects, createProject, updateProject, } from "../services/project.service";
import ProjectTable from "../components/project/ProjectTable";
import toast from "react-hot-toast";
import ProjectModal from "../components/project/ProjectModal";
import DeleteProjectModal from "../components/project/DeleteProjectModal";
import { deleteProject } from "../services/project.service";
import LoadingSpinner from "../components/common/LoadingSpinner";

function Projects() {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteProjectItem, setDeleteProjectItem] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {

    try {

      const data = await getProjects();

      setProjects(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  function handleEdit(project) {
  setSelectedProject(project);
  setShowModal(true);

}

  function handleDelete(project){
    setDeleteProjectItem(project);
    setDeleteModal(true);
}

  if (loading) {
    return (
      <div className="syncro-projects flex min-h-[60vh] items-center justify-center">
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
            .syncro-projects { font-family: 'Inter', sans-serif; }
            .syncro-projects h1 { font-family: 'Space Grotesk', sans-serif; }
        `}</style>
        <LoadingSpinner text="Loading..." />
      </div>
    );
  }

async function handleSave(data) {

  try {

    if (selectedProject) {

      await updateProject(
        selectedProject.id,
        {
          ...data,
          managerId: user.id,
        }
      );

      toast.success("Project updated successfully");

    } else {
      await createProject({
        ...data,
        managerId: user.id,
      });

      toast.success("Project created successfully");

    }

    setShowModal(false);
    setSelectedProject(null);
    loadProjects();

  } catch (error) {
    console.log(JSON.stringify(error.response?.data, null, 2));
    console.log(error.response?.data.errors);
    toast.error(error.response?.data?.message || "Operation failed");
  }

}
async function confirmDelete(){

    try{

        await deleteProject(deleteProjectItem.id);

        toast.success("Project deleted");

        setDeleteModal(false);

        setDeleteProjectItem(null);

        loadProjects();

    }catch(error){

        toast.error(
            error.response?.data?.message ||
            "Delete failed"
        );

    }

}

  return (

    <div className="syncro-projects space-y-6">

      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
          .syncro-projects { font-family: 'Inter', sans-serif; }
          .syncro-projects h1 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-3xl font-semibold text-[#12141C]">
            Projects
          </h1>

          <p className="mt-1.5 text-sm text-[#6B7280]">
            Manage your projects
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF6B4A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#F0562F] focus:outline-none focus:ring-4 focus:ring-[#FF6B4A]/25"
        >
          <FaPlus className="text-xs" />

          New Project
        </button>

      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-sm sm:p-4">
        <ProjectTable
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ProjectModal
      isOpen={showModal}
      onClose={() => {
      setShowModal(false);
      setSelectedProject(null);
    }}
    onSubmit={handleSave}
    initialData={selectedProject}
    />

    <DeleteProjectModal
    isOpen={deleteModal}
    project={deleteProjectItem}

    onCancel={() => {
        setDeleteModal(false);
        setDeleteProjectItem(null);
    }}
    onConfirm={confirmDelete}
    />

    </div>

  );
}

export default Projects;