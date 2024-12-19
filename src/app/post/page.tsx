'use client'

import * as React from 'react'
import { Camera, ChevronDown, LinkIcon, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function PostCreator() {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [isPreview, setIsPreview] = React.useState(false)
  const [thumbnailUrl, setThumbnailUrl] = React.useState('')

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setThumbnailUrl(url)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-slate-50 shadow-lg">
      <CardHeader className="border-b border-slate-200">
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100 rounded-t-lg">
            <TabsTrigger value="post" className="data-[state=active]:bg-white data-[state=active]:text-slate-900">
              New post
            </TabsTrigger>
            <TabsTrigger value="link" className="data-[state=active]:bg-white data-[state=active]:text-slate-900">
              <LinkIcon className="mr-2 h-4 w-4" />
              Share a link
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <Select>
            <SelectTrigger className="w-full bg-white border-slate-300">
              <Users className="mr-2 h-4 w-4 text-slate-500" />
              <SelectValue placeholder="Select Squad" />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="squad1">Alpha Squad</SelectItem>
              <SelectItem value="squad2">Beta Team</SelectItem>
              <SelectItem value="squad3">Gamma Group</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail preview"
                  className="object-cover w-full h-full"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-2 right-2 bg-white/90 hover:bg-slate-100 text-slate-800"
                  onClick={() => setThumbnailUrl('')}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Label
                htmlFor="thumbnail"
                className="flex flex-col items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 cursor-pointer transition-colors"
              >
                <Camera className="h-8 w-8 mb-2 text-slate-400" />
                <span className="text-sm text-slate-500">Add thumbnail</span>
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
              </Label>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                Post Title
              </Label>
              <span className="text-sm text-slate-500">
                {title.length}/250
              </span>
            </div>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={250}
              placeholder="Write an interesting title..."
              className="bg-white border-slate-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200">
              <div className="flex">
                <Button
                  variant="ghost"
                  className={`relative px-4 py-2 -mb-[1px] ${!isPreview ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                  onClick={() => setIsPreview(false)}
                >
                  Write
                </Button>
                <Button
                  variant="ghost"
                  className={`relative px-4 py-2 -mb-[1px] ${isPreview ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                  onClick={() => setIsPreview(true)}
                >
                  Preview
                </Button>
              </div>
              <span className="text-sm text-green-600">
                Saved
              </span>
            </div>
            {!isPreview ? (
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                className="min-h-[200px] bg-white border-slate-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            ) : (
              <div className="min-h-[200px] p-3 rounded-md bg-white border border-slate-300">
                {content || <span className="text-slate-500">Nothing to preview</span>}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

