'use client'

import * as React from 'react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tab'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { cn } from '@/utils/util'

// SVG Icons as components
const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

export default function PostCreator() {
  const [activeTab, setActiveTab] = React.useState('post')
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [isPreview, setIsPreview] = React.useState(false)
  const [thumbnailUrl, setThumbnailUrl] = React.useState('')
  const [selectedSquad, setSelectedSquad] = React.useState('')

  const squadOptions = [
    { value: 'squad1', label: 'Alpha Squad' },
    { value: 'squad2', label: 'Beta Team' },
    { value: 'squad3', label: 'Gamma Group' }
  ]

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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-slate-100 rounded-t-lg">
            <TabsTrigger value="post">
              New post
            </TabsTrigger>
            <TabsTrigger value="link">
              <LinkIcon />
              <span className="ml-2">Share a link</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="post">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <Select
                  options={squadOptions}
                  value={selectedSquad}
                  onChange={setSelectedSquad}
                  placeholder="Select Squad"
                  icon={<UsersIcon />}
                />

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
                        size="small"
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
                      <CameraIcon />
                      <span className="text-sm text-slate-500 mt-2">Add thumbnail</span>
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

                {/* Title Input */}
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
                    className="bg-white border-slate-300"
                  />
                </div>

                {/* Content Editor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200">
                    <div className="flex">
                      <Button
                        variant="text"
                        onClick={() => setIsPreview(false)}
                        size="small"
                        className={cn(!isPreview && "selected")}
                      >
                        Write
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => setIsPreview(true)}
                        size="small"
                        className={cn(isPreview && "selected")}
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
                      className="min-h-[200px] bg-white border-slate-300"
                    />
                  ) : (
                    <div className="min-h-[200px] p-3 rounded-md bg-white border border-slate-300">
                      {content || <span className="text-slate-500">Nothing to preview</span>}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="link">
            {/* Link sharing form content here */}
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  )
}

