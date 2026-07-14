import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getProjects, createProject, updateProject, } from "../services/project.service";
import ProjectTable from "../components/project/ProjectTable";
import toast from "react-hot-toast";
import ProjectModal from "../components/project/ProjectModal";
import DeleteProjectModal from "../components/project/DeleteProjectModal";
import { deleteProject } from "../services/project.service";

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
      <div className="text-center mt-20 text-xl">
        Loading Projects...
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

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Projects
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your projects
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FaPlus />

          New Project
        </button>

      </div>

      <ProjectTable
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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