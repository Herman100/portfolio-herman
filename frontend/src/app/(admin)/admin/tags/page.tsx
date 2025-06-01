"use client";

import { useEffect, useState } from "react";
import { Tag } from "@/types/tag";
import { tagService } from "@/services/tag-service";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TagsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);

  const fetchTags = async () => {
    try {
      const data = await tagService.getAll();
      setTags(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch tags",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await tagService.delete(id);
      toast({
        title: "Success",
        description: "Tag deleted successfully",
      });
      fetchTags();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete tag",
      });
    } finally {
      setDeleteDialogOpen(false);
      setTagToDelete(null);
    }
  };

  const handleEdit = (tagId: string) => {
    router.push(`/admin/tags/${tagId}`);
  };

  const openDeleteDialog = (tag: Tag) => {
    setTagToDelete(tag);
    setDeleteDialogOpen(true);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" color="primary" />;
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <SidebarTrigger className="-ml-1" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Tags</h1>
            <p className="text-sm sm:text-base text-gray-500">
              Manage your blog tags and organize your content effectively
            </p>
          </div>
          <Button
            onClick={() => router.push("/admin/tags/create")}
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Tag
          </Button>
        </div>

        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tags.map((tag) => (
                  <TableRow key={tag._id}>
                    <TableCell className="font-medium">{tag.name}</TableCell>
                    <TableCell>
                      {format(new Date(tag.createdAt), "PPP")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(tag.updatedAt), "PPP")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(tag._id)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(tag)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tag</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the tag "{tagToDelete?.name}"?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setTagToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => tagToDelete && handleDelete(tagToDelete._id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
