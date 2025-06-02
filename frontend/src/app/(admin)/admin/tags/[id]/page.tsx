"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { tagService } from "@/services/tag-service";
import { Tag } from "@/types/tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function EditTagPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState<Tag | null>(null);
  const [name, setName] = useState("");
  const params = useParams();
  const tagId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    const fetchTag = async () => {
      if (!tagId) return;
      try {
        const data = await tagService.getById(tagId);
        setTag(data);
        setName(data.name);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch tag",
        });
        router.push("/admin/tags");
      }
    };

    fetchTag();
  }, [tagId, router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!tagId) return;
      await tagService.update(tagId, { name });
      toast({
        title: "Success",
        description: "Tag updated successfully",
      });
      router.push("/admin/tags");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update tag",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!tag) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Tag</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter tag name"
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Tag"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
