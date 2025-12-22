"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Trash2, Upload, Loader2, Plus, LayoutGrid, Pencil, LogOut } from "lucide-react";

// Define the Service interface matching Supabase schema
interface Service {
    id: number;
    title: string;
    description: string;
    category: string;
    image_url: string;
    image_urls?: string[];
    created_at: string;
}

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Social Media");

    // Upload State
    const [bgFile, setBgFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);

    // Edit Mode State
    const [editingId, setEditingId] = useState<number | null>(null);
    const [existingBgUrl, setExistingBgUrl] = useState<string | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
            } else {
                fetchServices();
            }
        };

        checkSession();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const fetchServices = async () => {
        try {
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setServices(data || []);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service: Service) => {
        setEditingId(service.id);
        setTitle(service.title);
        setDescription(service.description);
        setCategory(service.category);
        setExistingBgUrl(service.image_url);
        setBgFile(null);
        setGalleryFiles(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setCategory("Social Media");
        setBgFile(null);
        setGalleryFiles(null);
        setExistingBgUrl(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description) {
            alert("Please fill in title and description.");
            return;
        }
        if (!editingId && !bgFile) {
            alert("Please upload a background image for the new service.");
            return;
        }

        setUploading(true);
        try {
            let finalBgUrl = existingBgUrl;
            let finalGalleryUrls: string[] = [];

            // 1. Upload Background if provided
            if (bgFile) {
                const fileExt = bgFile.name.split(".").pop();
                const fileName = `bg-${Date.now()}.${fileExt}`;
                const { error: bgError } = await supabase.storage
                    .from("service-images")
                    .upload(fileName, bgFile);

                if (bgError) throw bgError;

                const { data: { publicUrl } } = supabase.storage
                    .from("service-images")
                    .getPublicUrl(fileName);
                finalBgUrl = publicUrl;
            }

            // 2. Upload Gallery Files if provided
            if (galleryFiles && galleryFiles.length > 0) {
                for (let i = 0; i < galleryFiles.length; i++) {
                    const file = galleryFiles[i];
                    const fileExt = file.name.split(".").pop();
                    const fileName = `gallery-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

                    const { error: uploadError } = await supabase.storage
                        .from("service-images")
                        .upload(fileName, file);

                    if (uploadError) throw uploadError;

                    const { data: { publicUrl } } = supabase.storage
                        .from("service-images")
                        .getPublicUrl(fileName);

                    finalGalleryUrls.push(publicUrl);
                }
            }

            // 3. Database Operation
            if (editingId) {
                // UPDATE
                const currentService = services.find(s => s.id === editingId);
                const oldUrls = currentService?.image_urls || [];
                const mergedUrls = [...oldUrls, ...finalGalleryUrls];

                const { data: updatedData, error: updateError } = await supabase
                    .from("services")
                    .update({
                        title,
                        description,
                        category,
                        image_url: finalBgUrl,
                        image_urls: mergedUrls
                    })
                    .eq("id", editingId)
                    .select();

                if (updateError) throw updateError;
                if (!updatedData || updatedData.length === 0) {
                    alert("Update failed: No rows modified. Check RLS policies.");
                    return;
                }

                alert("Service updated successfully!");

            } else {
                // CREATE
                const { error: insertError } = await supabase
                    .from("services")
                    .insert([{
                        title,
                        description,
                        category,
                        image_url: finalBgUrl || "",
                        image_urls: finalGalleryUrls
                    }]);

                if (insertError) throw insertError;
                alert("Service created successfully!");
            }

            handleCancelEdit();
            fetchServices();

        } catch (error: any) {
            console.error("Error saving service:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            // 1. Get the service to find associated images
            const { data: service, error: fetchError } = await supabase
                .from("services")
                .select("image_url, image_urls")
                .eq("id", id)
                .single();

            if (fetchError) throw fetchError;

            // 2. Extract image paths
            const pathsToDelete: string[] = [];
            const extractPath = (url: string) => {
                // Extracts explicit path after /service-images/
                const match = url?.match(/service-images\/(.+)$/);
                return match ? decodeURIComponent(match[1]) : null;
            };

            if (service.image_urls && service.image_urls.length > 0) {
                service.image_urls.forEach((url: string) => {
                    const path = extractPath(url);
                    if (path) pathsToDelete.push(path);
                });
            } else if (service.image_url) {
                // Fallback for old records
                const path = extractPath(service.image_url);
                if (path) pathsToDelete.push(path);
            }

            // 3. Delete images from Storage if any found
            if (pathsToDelete.length > 0) {
                const { error: storageError } = await supabase.storage
                    .from("service-images")
                    .remove(pathsToDelete);

                if (storageError) console.error("Error deleting files:", storageError);
            }

            // 4. Delete record from Database
            const { error } = await supabase
                .from("services")
                .delete()
                .eq("id", id);

            if (error) throw error;

            fetchServices();
        } catch (error: any) {
            console.error("Error deleting service:", error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#02060C] text-white p-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <header className="mb-12 flex items-center justify-between border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-white mb-2">Service Manager</h1>
                        <p className="text-gray-400">Manage your agency services dynamically.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500/10 text-red-500 px-4 py-2 rounded-xl border border-red-500/20 flex items-center gap-2 hover:bg-red-500/20 transition-colors"
                        >
                            <LogOut size={18} />
                            <span className="font-bold">Sign Out</span>
                        </button>
                        <div className="bg-[#3CB7FF]/10 text-[#3CB7FF] px-4 py-2 rounded-full border border-[#3CB7FF]/20 flex items-center gap-2">
                            <LayoutGrid size={18} />
                            <span className="font-bold">Admin Panel</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT: UPLOAD FORM */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Plus className="text-[#3CB7FF]" /> {editingId ? "Edit Service" : "Add New Service"}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Service Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#3CB7FF] focus:outline-none transition-colors"
                                        placeholder="e.g. Social Media Management"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#3CB7FF] focus:outline-none transition-colors appearance-none"
                                    >
                                        <option>Social Media</option>
                                        <option>Design</option>
                                        <option>Development</option>
                                        <option>Strategy</option>
                                        <option>Marketing</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#3CB7FF] focus:outline-none transition-colors resize-none"
                                        placeholder="Brief description of the service..."
                                        required
                                    />
                                </div>

                                {/* BACKGROUND IMAGE INPUT */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Card Background/Cover {editingId && "(Leave empty to keep current)"}
                                    </label>
                                    <div className="relative border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-[#3CB7FF]/50 transition-colors group cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setBgFile(e.target.files ? e.target.files[0] : null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            required={!editingId} // Required only on create
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload className="text-gray-500 group-hover:text-[#3CB7FF] transition-colors" />
                                            <span className="text-sm text-gray-500 group-hover:text-gray-300">
                                                {bgFile ? bgFile.name : (existingBgUrl ? "Change Background" : "Upload Background")}
                                            </span>
                                        </div>
                                    </div>
                                    {existingBgUrl && !bgFile && (
                                        <p className="text-xs text-gray-500 mt-1">Current: ...{existingBgUrl.slice(-20)}</p>
                                    )}
                                </div>

                                {/* GALLERY IMAGES INPUT */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Project Gallery Images {editingId && "(Appends to existing)"}
                                    </label>
                                    <div className="relative border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-[#3CB7FF]/50 transition-colors group cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => setGalleryFiles(e.target.files)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <Plus className="text-gray-500 group-hover:text-[#3CB7FF] transition-colors" />
                                            <span className="text-sm text-gray-500 group-hover:text-gray-300">
                                                {galleryFiles ? `${galleryFiles.length} files selected` : "Add Gallery Images"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    {editingId && (
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="flex-1 bg-gray-700 text-white font-bold py-4 rounded-xl hover:bg-gray-600 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="flex-1 bg-[#3CB7FF] text-black font-bold py-4 rounded-xl hover:bg-[#3CB7FF]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {uploading ? (
                                            <>
                                                <Loader2 className="animate-spin" /> {editingId ? "Updating..." : "Creating..."}
                                            </>
                                        ) : (
                                            editingId ? "Update Service" : "Create Service"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT: SERVICES GRID */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6">Existing Services</h2>

                        {loading ? (
                            <div className="flex items-center justify-center py-20 text-gray-500">
                                <Loader2 className="animate-spin mr-2" /> Loading services...
                            </div>
                        ) : services.length === 0 ? (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                                <p className="text-gray-400">No services found. Add one to get started.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {services.map((service) => (
                                    <div key={service.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-[#3CB7FF]/30 transition-all">
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image
                                                src={service.image_url}
                                                alt={service.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <span className="text-xs font-mono text-[#3CB7FF] uppercase tracking-wider mb-1 block">
                                                    {service.category}
                                                </span>
                                                <h3 className="font-bold text-lg leading-tight">{service.title}</h3>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <p className="text-gray-400 text-sm line-clamp-2 mb-6 h-10">
                                                {service.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                                <span className="text-xs text-gray-600">
                                                    ID: {service.id}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(service)}
                                                        className="text-[#3CB7FF] hover:bg-[#3CB7FF]/10 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                                                    >
                                                        <Pencil size={16} /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(service.id)}
                                                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                                                    >
                                                        <Trash2 size={16} /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
