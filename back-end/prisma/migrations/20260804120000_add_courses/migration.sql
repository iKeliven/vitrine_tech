-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "category" TEXT,
    "shortDescription" TEXT,
    "description" TEXT NOT NULL,
    "targetAudience" TEXT,
    "requirements" TEXT,
    "documents" TEXT,
    "image" TEXT,
    "duration" TEXT,
    "level" TEXT,
    "officialUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseModule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "CourseModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSubject" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "workload" TEXT NOT NULL,
    "semester" TEXT,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "CourseSubject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseModule"
ADD CONSTRAINT "CourseModule_courseId_fkey"
FOREIGN KEY ("courseId") REFERENCES "Course"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSubject"
ADD CONSTRAINT "CourseSubject_moduleId_fkey"
FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
